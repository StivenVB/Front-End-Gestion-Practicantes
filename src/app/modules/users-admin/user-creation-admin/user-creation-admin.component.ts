import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
import { UserAdminService } from '../../../services/users-admin/user-admin.service';
import { UserAdminModel } from '../../../models/users-admin/user-admin-model';


const matchValidator = (matchTo: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control && control.parent) {
      const matchingControl = control.parent.get(matchTo);
      if (matchingControl && control.value !== matchingControl.value) {
        return { isMatching: false };
      }
    }
    return null;
  };
};

@Component({
  selector: 'app-user-creation-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxSpinnerModule],
 templateUrl: './user-creation-admin.component.html',
  styleUrl: './user-creation-admin.component.css'
})
export class UserCreationAdminComponent implements OnInit {
  fgValidator!: FormGroup;
  uploadForm!: FormGroup;
  minLengthName: number = FormsConfig.MIN_LENGTH_NAME;
  minLengthCode: number = FormsConfig.MIN_LENGTH_CODE;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: UserAdminService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      educationalInstitution: [],
      faculty: [],
      career: [],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],
      roleId: ['',[Validators.required]]
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
          this.router.navigate(['/users-admin/list']);
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
  getRecordData(): UserAdminModel {
    let model = new UserAdminModel();
    model.name = this.fgv['name'].value;
    model.lastName = this.fgv['lastName'].value;
    model.identification = this.fgv['identification'].value;
    model.username = this.fgv['username'].value;
    model.phone = this.fgv['phone'].value;
    model.educationalInstitution = this.fgv['educationalInstitution'].value;
    model.faculty = this.fgv['faculty'].value;
    model.career = this.fgv['career'].value;
    model.roleId = this.fgv['roleId'].value;
    model.password = this.fgv['password'].value;
    console.log(model);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
