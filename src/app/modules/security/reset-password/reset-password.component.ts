import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { ResetPasswordModel } from '../../../models/security/reset-password.model';
import Swal from 'sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  fgValidator!: FormGroup;
  document_min_length: number = FormsConfig.DOCUMENT_MIN;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.document_min_length)]]
    });
  }

  ResetPassword() {
    if (this.fgValidator.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario invalido',
        text: 'Corrija los errores en el formulario antes de enviarlo.'
      });
    } else {
      this.isLoading = true;
      this.spinner.show();
      let model = this.getResetPasswordData();
      this.service.ResetPassword(model).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Exitoso',
            text: 'Verifique su bandeja de entrada de correo electrónico, se ha enviado un token para generar su nueva contraseña.'
          });
          this.router.navigate(["/security/change-password"]);
        },
        err => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al procesar datos. Por favor, inténtelo de nuevo más tarde.'
          });
        }
      );
    }
  }

  /**
   * Build a model instance to send it
   */
  getResetPasswordData(): ResetPasswordModel {
    let model = new ResetPasswordModel();
    model.email = this.fgv["username"].value;
    console.log(model);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
