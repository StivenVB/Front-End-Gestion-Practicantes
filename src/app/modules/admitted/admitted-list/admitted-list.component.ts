import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { AdmittedService } from '../../../services/admitted/admitted.service';
import { AdmittedModel } from '../../../models/admitted/admitted.model';

@Component({
  selector: 'app-admitted-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, RouterModule, NgxSpinnerModule, FormsModule],
  templateUrl: './admitted-list.component.html',
  styleUrl: './admitted-list.component.css'
})
export class AdmittedListComponent {
  page: number = 1;
  recordList: AdmittedModel[] = [];
  filteredRecordList: AdmittedModel[] = [];
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  isLoading: boolean = true;
  searchTerm: string = '';

  constructor(private service: AdmittedService,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getRecordList();
  }

  ngOnChanges(): void {
    this.filterRecords();
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

  filterRecords() {
    const term = this.searchTerm.toLowerCase();
    this.filteredRecordList = this.recordList.filter(doc => 
      (doc.offerDescription?.toLowerCase().includes(term) || '') ||
      (doc.offerYear?.toString()?.toLowerCase().includes(term) || '') ||
      (doc.userIdentification?.toLowerCase().includes(term) || '')
    );
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
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ListaAdmitidos');
    XLSX.writeFile(workbook, 'ListaAdmitidos.xlsx');
  }
}

