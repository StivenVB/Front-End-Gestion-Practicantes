import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
import { UserAdminService } from '../../../services/users-admin/user-admin.service';
import { UserAdminModel } from '../../../models/users-admin/user-admin-model';

@Component({
  selector: 'app-user-edition-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './user-edition-admin.component.html',
  styleUrl: './user-edition-admin.component.css'
})
export class UserEditionAdminComponent implements OnInit {
  fgValidator!: FormGroup;
  minLengthName: number = FormsConfig.MIN_LENGTH_NAME;
  minLengthCode: number = FormsConfig.MIN_LENGTH_CODE;
  id!: number;
  username!: string;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: UserAdminService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getRecordDataByUsername();
    this.FormBuilding();
  }

  getRecordDataByUsername() {
    this.id = this.route.snapshot.params["id"];
    this.username = this.route.snapshot.params["username"];
    this.service.getRecordByUsername(this.username).subscribe(
      data => {
        this.fgv['name'].setValue(data.name);
        this.fgv['lastName'].setValue(data.lastName);
        this.fgv['identification'].setValue(data.identification);
        this.fgv['username'].setValue(data.username);
        this.fgv['phone'].setValue(data.phone);
        this.fgv['educationalInstitution'].setValue(data.educationalInstitution);
        this.fgv['faculty'].setValue(data.faculty);
        this.fgv['career'].setValue(data.career);
        this.fgv['roleId'].setValue(data.roleId);
      }
    );
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      id:[],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      identification: ['', [Validators.required]],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      educationalInstitution: [],
      faculty: [],
      career: [],
      roleId: ['',[Validators.required]]
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
          this.router.navigate(['/users-admin/list']);
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
  getRecordData(): UserAdminModel {
    let model = new UserAdminModel();
    model.id = Number(this.id);
    model.name = this.fgv['name'].value;
    model.lastName = this.fgv['lastName'].value;
    model.identification = this.fgv['identification'].value;
    model.username = this.fgv['username'].value;
    model.phone = this.fgv['phone'].value;
    model.educationalInstitution = this.fgv['educationalInstitution'].value;
    model.faculty = this.fgv['faculty'].value;
    model.career = this.fgv['career'].value;
    model.roleId = this.fgv['roleId'].value;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
