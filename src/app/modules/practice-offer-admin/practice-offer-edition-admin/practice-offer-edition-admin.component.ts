import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PracticeOfferAdminService } from '../../../services/practice-offer-admin/practice-offer-admin.service';
import { PracticeOfferAdminModel } from '../../../models/practice-offer-admin/practice-offer-admin.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-practice-offer-edition-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './practice-offer-edition-admin.component.html',
  styleUrl: './practice-offer-edition-admin.component.css'
})
export class PracticeOfferEditionAdminComponent implements OnInit {
  fgValidator!: FormGroup;
  minLengthName: number = FormsConfig.MIN_LENGTH_NAME;
  minLengthCode: number = FormsConfig.MIN_LENGTH_CODE;
  id!: string; 
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: PracticeOfferAdminService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getRecordDataById();
    this.FormBuilding();
  }

  getRecordDataById() {
    this.id = this.route.snapshot.params["id"];
    this.service.getRecordById(this.id).subscribe(
      data => {
        this.fgv['isActive'].setValue(data.isActive);
        this.fgv['startDate'].setValue(data.startDate);
        this.fgv['faculty'].setValue(data.faculty);
        this.fgv['career'].setValue(data.career);
        this.fgv['description'].setValue(data.description);
        this.fgv['year'].setValue(data.year);
        this.fgv['semester'].setValue(data.semester);
        this.fgv['endDate'].setValue(data.endDate);
      }
    );
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      id:[],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      faculty: ['', [Validators.required]],
      career: ['', [Validators.required]],
      year: ['', [Validators.required]],
      isActive: [null, [Validators.required]],
      semester: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }

  editRecord() {
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
      this.service.editRecord(model).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Exitoso',
            text: 'El registro se ha actualizado correctamente.'
          });
          this.router.navigate(['/practice-offer-admin/list']);
        },
        error => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error actualizando el regitro.'
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
    model.id = this.id;
    model.faculty = this.fgv['faculty'].value;
    model.career = this.fgv['career'].value;
    model.description = this.fgv['description'].value;
    model.endDate = this.fgv['endDate'].value;
    model.semester = this.fgv['semester'].value;
    model.year = this.fgv['year'].value;
    model.startDate = this.fgv['startDate'].value;
    model.isActive = this.fgv['isActive'].value;
    console.log(model);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
