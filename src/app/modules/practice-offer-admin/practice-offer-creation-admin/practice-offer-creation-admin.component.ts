import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { PracticeOfferAdminService } from '../../../services/practice-offer-admin/practice-offer-admin.service';
import { Router, RouterModule } from '@angular/router';
import { PracticeOfferAdminModel } from '../../../models/practice-offer-admin/practice-offer-admin.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-practice-offer-creation-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './practice-offer-creation-admin.component.html',
  styleUrl: './practice-offer-creation-admin.component.css'
})
export class PracticeOfferCreationAdminComponent implements OnInit {
  fgValidator!: FormGroup;
  uploadForm!: FormGroup;
  minLengthName: number = FormsConfig.MIN_LENGTH_NAME;
  minLengthCode: number = FormsConfig.MIN_LENGTH_CODE;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: PracticeOfferAdminService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    faculty: ['', [Validators.required]],
    career: ['', [Validators.required]],
    year: ['', [Validators.required]],
    isActive: [null, Validators.required],
    semester: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    });
  }

  saveNewRecord() {
    if (this.fgValidator.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario invalido.'
      });
    } else {
      this.isLoading = true;
      this.spinner.show();
      let model = this.getRecordData();
      this.service.saveNewRecord(model).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Exitoso',
            text: 'El registro se ha guardado correctamente.'
          });
          this.router.navigate(['/practice-offer-admin/list']);
        },
        error => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el registro.'
          });
        }
      );
    }
  }

  /**
   * Build a model instance to send it
   */
  getRecordData(): PracticeOfferAdminModel {
    let model = new PracticeOfferAdminModel();
    model.faculty = this.fgv['faculty'].value;
    model.career = this.fgv['career'].value;
    model.description = this.fgv['description'].value;
    model.endDate = this.fgv['endDate'].value;
    model.semester = this.fgv['semester'].value;
    model.year = this.fgv['year'].value;
    model.startDate = this.fgv['startDate'].value;
    model.isActive = this.fgv['isActive'].value;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
