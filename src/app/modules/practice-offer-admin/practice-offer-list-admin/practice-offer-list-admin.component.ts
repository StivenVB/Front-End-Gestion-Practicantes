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
import * as bootstrap from 'bootstrap'; // Import Bootstrap

@Component({
  selector: 'app-practice-offer-list-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, RouterModule, NgxSpinnerModule],
  templateUrl: './practice-offer-list-admin.component.html',
  styleUrls: ['./practice-offer-list-admin.component.css']
})
export class PracticeOfferListAdminComponent implements OnInit {
  page: number = 1;
  recordList: PracticeOfferAdminModel[] = [];
  deleteRecordId!: string;
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  isLoading: boolean = true;

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
      const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal')!);
      deleteModal.show();
    } else {
      console.error('El id del registro es undefined');
    }
  }

  RemoveRecord() {
    this.service.removeRecord(this.deleteRecordId).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Exitoso',
          text: 'El registro se ha eliminado correctamente.'
        });
        this.getRecordList();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error eliminando el registro.'
        });
      }
    );
  }
}
