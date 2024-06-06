import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VirtualLibraryModel } from '../../../models/virtual-library/virtual-library.model';
import { FormsConfig } from '../../../config/forms-config';
import { VirtualLibraryService } from '../../../services/virtual-library/virtual-library.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-virtual-library-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, RouterModule, NgxSpinnerModule],
  templateUrl: './virtual-library-list.component.html',
  styleUrl: './virtual-library-list.component.css'
})
export class VirtualLibraryListComponent {
  page: number = 1;
  recordList: VirtualLibraryModel[] = [];
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  isLoading: boolean = true;

  constructor(private service: VirtualLibraryService,
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
}
