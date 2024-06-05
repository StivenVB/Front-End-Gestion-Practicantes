import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PracticeOfferModel } from '../../../models/practice-offer.model';
import { ParacticeOfferService } from '../../../services/paractice-offer.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { SecurityService } from '../../../services/security.service';
import { PracticePostulationService } from '../../../services/practice-postulation.service';
import { PracticePostulationModel } from '../../../models/practice-postulation.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

declare var $:any;

@Component({
  selector: 'app-practice-offers-list',
  standalone: true,
  imports: [NgFor, NgClass, NgIf, CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './practice-offers-list.component.html',
  styleUrl: './practice-offers-list.component.css'
})
export class PracticeOffersListComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  fgValidator!: FormGroup;
  selectedIndex: number = 0;
  loading: boolean = false;
  loadedForm: boolean = false;
  loadingPostulation: boolean = false;
  practiceOfferList: PracticeOfferModel[] = [];
  practicePostulationList: PracticePostulationModel[] = [];
  practiceOffer: PracticeOfferModel = new PracticeOfferModel;
  files: File[] = [];
  faXmark: any = faXmark;

  constructor(
    private practiceOfferService: ParacticeOfferService,
    private securityService: SecurityService,
    private practicePostulationService: PracticePostulationService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.LoadPracticePostulations();
    this.LoadPracticeOffers();
  }

  LoadPracticeOffers() {
    this.loading = true;
    this.practiceOfferService.GetPracticeOfferList().subscribe(
      data => {
        console.log(data);
        this.loading = false;
        console.log(data);
        this.practiceOfferList = data;
        if (data.length > 0) {
          this.practiceOffer = data[0];
          this.FormBuilding();
        }
      },
      error => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se presentó un problema al consultar las ofertas de práctica.'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']);
          }
        });
      }
    )
  }

  LoadPracticePostulations() {
    if (this.activeSession()) {
      this.practicePostulationService.GetPracticePostulationsByUser().subscribe(
        data => {
          console.log(data);
          this.practicePostulationList = data;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  IsApplyPostulation(practiceOfferId: number | undefined) {
    let apply: boolean = false;

    if (practiceOfferId && this.activeSession()) {
      let practicePostulation = this.practicePostulationList.find(p => p.practiceOfferId == practiceOfferId);
      if (practicePostulation) {
        apply = true;
      }
    }

    return apply;
  }

  viewPracticeOffer(practiceOffer: PracticeOfferModel, index: number) {
    this.practiceOffer = practiceOffer;
    this.selectedIndex = index;
    this.files = [];
    this.FormBuilding();
  }

  ApplyPostulation(practiceOfferId: number | undefined) {
    if (practiceOfferId && this.activeSession()) {
      this.loadingPostulation = true;
      let practicePostulation: PracticePostulationModel = {
        status: "Postulación Enviada",
        userId: parseInt(this.securityService.getUserId().toString()),
        practiceOfferId: practiceOfferId,
        formData: this.fgValidator.value
      };

      this.practicePostulationService.SavePracticePostulation(practicePostulation).subscribe(
        data => {
          this.loadingPostulation = false;
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Postulación realizada correctamente.'
          });
          $('#modalQuestion').modal('hide');
          this.LoadPracticePostulations();
          this.LoadPracticeOffers();
        },
        error => {
          this.loadingPostulation = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se presentó un problema al realizar la postulación'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/']);
            }
          });
        }
      );
    } else {
      this.closeQuestionModal();
      this.router.navigate(['security/login']);
    }
  }

  activeSession() {
    return this.securityService.sessionExists();
  }

  openQuestionModal(){
    $('#modalQuestion').modal('show');
  }

  closeQuestionModal(){
    this.files = [];
    $('#modalQuestion').modal('hide');
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({});
    var formSchema = this.practiceOffer.formSchema && this.practiceOffer.formSchema.fields ? this.practiceOffer.formSchema.fields : [];
    for (let index = 0; index < formSchema.length; index++) {
      const validators = [Validators.required];
      const control = new FormControl('', validators);
      this.fgValidator.addControl(formSchema[index].name.toString(), control);
    }
    this.loadedForm = true;
  }

  get fgv() {
    return this.fgValidator.controls;
  }

  hasFields(practiceOffer: PracticeOfferModel) {
    return practiceOffer.formSchema != null && practiceOffer.formSchema.fields.length > 0;
  }

  uploadFile() {
    $('#ipLoadFile').click();
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      for (let file of event.target.files) {
        this.files.push(file);
      }
      this.fileInput.nativeElement.value = '';
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  uploadFiles() {
    // Aquí puedes implementar la lógica para cargar los archivos al servidor
    console.log('Uploading files:', this.files);
    // Ejemplo de carga de archivos al servidor:
    // const formData = new FormData();
    // this.files.forEach(file => formData.append('files', file, file.name));
    // this.http.post('your-upload-endpoint', formData).subscribe(response => {
    //   console.log('Files uploaded successfully:', response);
    // });
  }
}
