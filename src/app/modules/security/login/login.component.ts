import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsConfig } from '../../../config/forms-config';
import { SecurityService } from '../../../services/security.service';
import { UserModel } from '../../../models/security/user.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgValidator!: FormGroup;
  document_min_length: number = FormsConfig.DOCUMENT_MIN;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.document_min_length)]],
      password: ['', [Validators.required]]
    });
  }

  LoginUser() {
    if (this.fgValidator.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario invalido.'
      });
    } else {
      this.isLoading = true;
      this.spinner.show();
      let model = this.getLoginData();
      this.service.LoginUser(model).subscribe(
        data => {
          this.isLoading = false;
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Exitoso',
            text: 'Bienvenido'
          });
          this.service.saveSession(data);
          this.router.navigate(['/home']);
        },
        err => {
          this.isLoading = false;
          this.spinner.hide();
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Datos inválidos, por favor ingrese un usuario y contraseña correctos.'
          });
        }
      );
    }
  }

  /**
   * Build a model instance to send it
   */
  getLoginData(): UserModel {
    let model = new UserModel();
    model['username'] = this.fgv['username'].value.toString();
    model['password'] = this.fgv['password'].value.toString();
    console.log(model);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}