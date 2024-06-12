import { Component, OnInit } from '@angular/core';
import { PracticePostulationService } from '../../../../services/practice-postulation.service';
import { PracticePostulationModel } from '../../../../models/practice-postulation.model';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgFor, NgIf } from '@angular/common';
import { SecurityService } from '../../../../services/security.service';
import { faDownload, faCheck, faXmark, faInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';
import { GeneralFunctions } from '../../../../../assets/ts-scripts/general-functions';
import { FormsConfig } from '../../../../config/forms-config';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

declare var $:any;

@Component({
  selector: 'app-practice-postulation-list',
  standalone: true,
  imports: [NgxPaginationModule, NgFor, NgIf, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './practice-postulation-list.component.html',
  styleUrl: './practice-postulation-list.component.css'
})
export class PracticePostulationListComponent implements OnInit {
  loading: boolean = false;
  loadingUpdate: boolean = false;
  p: number = 1;
  faDownload: any = faDownload;
  faCheck: any = faCheck;
  faXmark: any = faXmark;
  faInfo: any = faInfo;
  searchTerm: string = '';
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  practicePostulationList: PracticePostulationModel[] = [];
  practicePostulation: PracticePostulationModel = new PracticePostulationModel;
  filteredRecordList: PracticePostulationModel[] = [];

  constructor(
    private practicePostulationSrv: PracticePostulationService,
    private securityService: SecurityService
  ) {}

  ngOnInit(): void {
    this.loadPracticePostulations();
  }

  loadPracticePostulations() {
    if (this.securityService.sessionExists()) {
      this.loading = true;
      this.practicePostulationSrv.GetPracticePostulations().subscribe(
        data => {
          this.loading = false;
          console.log(data);
          this.practicePostulationList = data;
          this.filteredRecordList = data;
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      )
    }
  }

  handlePageSizeChange(event: any): void {
    this.p = event;
  }

  openModal(practicePostulation: PracticePostulationModel) {
    console.log(practicePostulation);
    this.practicePostulation = practicePostulation;
    $('#modalPostulationInfo').modal('show');
  }

  closeModal() {
    this.practicePostulation = new PracticePostulationModel;
    $('#modalPostulationInfo').modal('hide');
  }

  acceptPostulation(practicePostulation: PracticePostulationModel) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: '¿Seguro que deseas aprobar esta postulación?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        practicePostulation.status = 'Aceptada';
        this.updatePostulationStatus(practicePostulation);
      }
    });
  }

  rejectPostulation(practicePostulation: PracticePostulationModel) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: '¿Seguro que deseas rechazar esta postulación?',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        practicePostulation.status = 'Rechazada';
        this.updatePostulationStatus(practicePostulation);
      }
    });
  }

  updatePostulationStatus(practicePostulation: PracticePostulationModel) {
    //this.loadingUpdate = true;
    this.practicePostulationSrv.UpdatePracticePostulation(practicePostulation).subscribe(
      data => {
        console.log(data);
        this.loadingUpdate = false;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Postulación actualizada correctamente.'
        });
      },
      error => {
        this.loadingUpdate = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se presentó un problema al actualizar la postulación'
        });
      }
    )
  }

  filterRecords() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRecordList = this.practicePostulationList.filter(doc =>
      (doc.offerfaculty?.toLowerCase().includes(term) || '') ||
      (doc.userfirstname?.toLowerCase().includes(term) || '') ||
      (doc.userlastname?.toLowerCase().includes(term) || '') ||
      (doc.status?.toLowerCase().includes(term) || '') ||
      (`${doc.offeryear}-${doc.offersemester}`.includes(term) || '') ||
      (GeneralFunctions.formatDate(doc.createdAt).includes(term))
    );
  }

  updateItemsPerPage() {
    if (!this.itemsPageAmount || this.itemsPageAmount <= 0) {
      this.itemsPageAmount = FormsConfig.ITEMS_PER_PAGE;
    }
    this.p = 1;
    this.filterRecords();
  }

}
