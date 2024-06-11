import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PracticePostulationService } from '../../../services/practice-postulation.service';
import { PracticePostulationModel } from '../../../models/practice-postulation.model';
import { PracticePostulationUserModel } from '../../../models/practice-postulation-user.model';
import { ParacticeOfferService } from '../../../services/paractice-offer.service';
import { PracticeOfferModel } from '../../../models/practice-offer.model';
import { UrlRepositoryService } from '../../../services/url-repository.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-practice-file',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './upload-practice-file.component.html',
  styleUrl: './upload-practice-file.component.css'
})
export class UploadPracticeFileComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  uploadForm: FormGroup;
  file: File | null = null;
  isDragging: boolean = false;
  practiceOfferList: PracticeOfferModel[] = [];
  practicePostulationList: PracticePostulationModel[] = [];
  practiceOfferListUser: PracticePostulationUserModel[] = [];
  files: File[] = [];
  loading: boolean = false;
  uploadError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private practiceOfferService: ParacticeOfferService,
    private practicePostulationService: PracticePostulationService,
    private urlRepositoryService: UrlRepositoryService,
    private datePipe: DatePipe,
    private router: Router
    ) {
    this.uploadForm = this.formBuilder.group({
      description: ['', Validators.required],
      postulation: ['', Validators.required],
      file: [null]
    });
  }

  ngOnInit(): void {
    this.LoadPracticePostulations();
  }

  LoadPracticeOffers() {
    this.practiceOfferService.GetPracticeOfferList().subscribe(
      data => {
        console.log(data);
        this.practiceOfferList = data;
        this.FilterPracticePostulations();
      },
      error => {
        console.log(error);
      }
    )
  }

  LoadPracticePostulations() {
    this.practicePostulationService.GetPracticePostulationsByUser().subscribe(
      data => {
        console.log(data);
        this.practicePostulationList = data;
        this.LoadPracticeOffers();
      },
      error => {
        console.log(error);
      }
    )
  }

  FilterPracticePostulations() {
    this.practicePostulationList.forEach(p => {
      let practiceOffer = this.practiceOfferList.find(o => o.id == p.practiceOfferId);
      if (practiceOffer) {
        let practiceOfferUser: PracticePostulationUserModel = {
          postulationId: p.id,
          faculty: practiceOffer.faculty,
          description: practiceOffer.description,
          semester: practiceOffer.semester,
          userId: p.userId,
          practiceOfferId: p.practiceOfferId,
          status: p.status,
          createdAt: this.datePipe.transform(p.createdAt, 'dd-MM-yyyy')?.toString()
        };

        this.practiceOfferListUser.push(practiceOfferUser);
      }
    });
    console.log(this.practiceOfferListUser);
  }

  onFileChange(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        this.files.push(selectedFiles[i]);
      }
      this.fileInput.nativeElement.value = '';
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length) {
      const droppedFiles = event.dataTransfer.files;
      for (let i = 0; i < droppedFiles.length; i++) {
        this.files.push(droppedFiles[i]);
      }
      this.uploadForm.patchValue({
        files: this.files
      });
    }
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  onSubmit() {
    if (this.uploadForm.valid && this.files.length > 0) {
      this.loading = true;
      for (let file of this.files) {
        var formData: FormData = new FormData();
        formData.append("name", file.name);
        formData.append("description", this.uploadForm.get('description')?.value);
        formData.append("file", file, file.name);
        formData.append("relateId", this.uploadForm.get('postulation')?.value);
        formData.append("relatedTable", "practicepostulation");

        this.urlRepositoryService.UploadFile(formData).subscribe(
          data => {
            console.log(data);
          },
          error => {
            this.uploadError = true;
          }
        );
      }

      this.loading = false;
      if (!this.uploadError) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Archivo(s) cargado(s) correctamente.'
        });
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se presentó un problema al cargar los archivos.'
        });
      }
    }
  }
}
