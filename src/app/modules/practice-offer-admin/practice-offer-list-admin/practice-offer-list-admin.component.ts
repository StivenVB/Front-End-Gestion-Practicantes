import { Component, OnInit } from '@angular/core';
import { PracticeOfferAdminModel } from '../../../models/practice-offer-admin/practice-offer-admin.model';
import { FormsConfig } from '../../../config/forms-config';
import { PracticeOfferAdminService } from '../../../services/practice-offer-admin/practice-offer-admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GeneralFunctions } from '../../../../assets/ts-scripts/general-functions';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-practice-offer-list-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, RouterModule, NgxSpinnerModule, FormsModule],
  templateUrl: './practice-offer-list-admin.component.html',
  styleUrls: ['./practice-offer-list-admin.component.css']
})
export class PracticeOfferListAdminComponent implements OnInit {
  page: number = 1;
  recordList: PracticeOfferAdminModel[] = [];
  filteredRecordList: PracticeOfferAdminModel[] = [];
  deleteRecordId!: string;
  changeStateRecordId!: string;
  changeCurrentState!: boolean;
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  isLoading: boolean = true;
  searchTerm: string = '';

  constructor(private service: PracticeOfferAdminService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getRecordList();
  }

  getRecordList() {
    this.service.getAllRecords().subscribe(
      records => {
        this.recordList = records;
        this.filteredRecordList = records;
        this.isLoading = false;
        this.spinner.hide();
      },
      error => {
        this.isLoading = false;
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error.',
          text: 'Hay un problema con la comunicación interna.'
        });
      }
    );
  }

  RemoveRecordConfirmation(recordId: string | undefined) {
    if (recordId) {
      this.deleteRecordId = recordId;
      this.openQuestionModal("deleteModal");
    } else {
      console.error('El id del registro es undefined');
    }
  }

  RemoveRecord() {
    this.service.removeRecord(this.deleteRecordId).subscribe(
      response => {
        this.closeQuestionModal("deleteModal");
        Swal.fire({
          icon: 'success',
          title: 'Exitoso',
          text: 'El registro se ha eliminado correctamente.'
        });
        this.getRecordList();
      },
      error => {
        this.closeQuestionModal("deleteModal");
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error eliminando el registro.'
        });
      }
    );
  }

  ChangeStateConfirmation(recordId: string | undefined, currentState: boolean | undefined) {
    if (recordId) {
      this.changeStateRecordId = recordId;
      this.changeCurrentState = currentState ?? false;
      this.openQuestionModal('changeStateModal');
    } else {
      console.error('El id del registro es undefined');
    }
  }

  ChangeState() {
    const model = {
      id: this.changeStateRecordId,
      isActive: !this.changeCurrentState
    };

    this.service.editRecord(model).subscribe(
      response => {
        this.closeQuestionModal('changeStateModal');
        Swal.fire({
          icon: 'success',
          title: 'Exitoso',
          text: 'El registro ha cambiado de estado correctamente.'
        });
        this.getRecordList();
      },
      error => {
        this.closeQuestionModal('changeStateModal');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error cambiando de estado el registro.'
        });
      }
    );
  }

  filterRecords() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRecordList = this.recordList.filter(doc => 
      (doc.career?.toLowerCase().includes(term) || '') ||
      (doc.faculty?.toLowerCase().includes(term) || '') ||
      (doc.description?.toLowerCase().includes(term) || '') ||
      (GeneralFunctions.formatDate(doc.createdAt).includes(term)) ||
      (doc.year?.toString().includes(term) || '')
    );
  }

  getTextState(isActive: boolean | undefined): string {
    return GeneralFunctions.getTextState(isActive ?? false);
  }

  openQuestionModal(modalId: string) {
    $(`#${modalId}`).modal('show');
  }

  closeQuestionModal(modalId: string) {
    $(`#${modalId}`).modal('hide');
  }

  updateItemsPerPage() {
    if (!this.itemsPageAmount || this.itemsPageAmount <= 0) {
      this.itemsPageAmount = FormsConfig.ITEMS_PER_PAGE;
    }
    this.page = 1;
    this.filterRecords();
  }
}
