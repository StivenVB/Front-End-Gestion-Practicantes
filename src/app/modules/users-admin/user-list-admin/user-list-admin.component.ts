import { Component, OnInit } from '@angular/core';
import { FormsConfig } from '../../../config/forms-config';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { UserAdminModel } from '../../../models/users-admin/user-admin-model';
import { UserAdminService } from '../../../services/users-admin/user-admin.service';
import * as XLSX from 'xlsx';

declare var $: any;

@Component({
  selector: 'app-user-list-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, RouterModule, NgxSpinnerModule, FormsModule],
  templateUrl: './user-list-admin.component.html',
  styleUrls: ['./user-list-admin.component.css']
})
export class UserListAdminComponent implements OnInit {
  page: number = 1;
  recordList: UserAdminModel[] = [];
  filteredRecordList: UserAdminModel[] = [];
  deleteRecordId!: number;
  changeStateRecordId!: string;
  changeCurrentState!: boolean;
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  isLoading: boolean = true;
  searchTerm: string = '';

  constructor(private service: UserAdminService, private spinner: NgxSpinnerService) {}

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

  RemoveRecordConfirmation(recordId: number | undefined) {
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

  filterRecords() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRecordList = this.recordList.filter(doc => 
      (doc.identification?.toLowerCase().includes(term) || '') ||
      (doc.name?.toLowerCase().includes(term) || '') ||
      (doc.lastName?.toLowerCase().includes(term) || '')
    );
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

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.recordList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuarios');
    XLSX.writeFile(workbook, 'Usuarios.xlsx');
  }
}
