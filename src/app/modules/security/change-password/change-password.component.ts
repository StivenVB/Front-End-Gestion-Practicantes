import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { ChangePasswordModel } from '../../../models/security/change-password.model';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

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
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxSpinnerModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  fgValidator!: FormGroup;
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
      token: ['',Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, matchValidator('newPassword')]]
    });
  }

  ChangePassword() {
    if (this.fgValidator.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario inválido'
      });
    } else {
      this.isLoading = true;
      this.spinner.show();
      let model = this.getChangePasswordData();
      this.service.ChangePassword(model).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Exitoso',
            text: 'Tu contraseña fue cambiada exitosamente.'
          });
          this.router.navigate(["/security/login"]);
        },
        err => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al procesar datos. Inténtalo de nuevo.'
          });
        }
      );
    }
  }

  /**
   * Build a model instance to send it
   */
  getChangePasswordData(): ChangePasswordModel {
    let model = new ChangePasswordModel();
    model.token = this.fgv['token'].value.toString();
    model.newPassword = this.fgv['newPassword'].value.toString();
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
