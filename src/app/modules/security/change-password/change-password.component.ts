import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { ChangePasswordModel } from '../../../models/security/change-password.model';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  fgValidator!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      newPassword2: ['', [Validators.required]]
    });
  }

  ChangePassword() {
    if (this.fgValidator.invalid || this.fgv['newPassword'].value !== this.fgv['newPassword2'].value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid form. Make sure both passwords match and meet the minimum requirements.'
      });
    } else {
      let model = this.getChangePasswordData();
      this.service.ChangePassword(model).subscribe(
        data => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Your password has been changed successfully.'
          });
          this.router.navigate(["/security/login"]);
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error processing data. Please try again.'
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
    model.id = this.service.getUserId() ?? undefined;
    model.currentPassword = this.fgv['currentPassword'].value.toString();
    model.newPassword = this.fgv['newPassword'].value.toString();
    console.log(model);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
