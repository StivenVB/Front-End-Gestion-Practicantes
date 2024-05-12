import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { SecurityService } from '../../../services/security.service';
import { Router } from '@angular/router';
import { ResetPasswordModel } from '../../../models/security/reset-password.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  fgValidator!: FormGroup;
  document_min_length: number = FormsConfig.DOCUMENT_MIN;

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
      username: ['', [Validators.required, Validators.minLength(this.document_min_length)]],
      type: ['', [Validators.required]]
    });
  }

  ResetPassword() {
    if (this.fgValidator.invalid) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Form',
            text: 'Please correct the errors in the form before submitting.'
        });
    } else {
        let model = this.getResetPasswordData();
        this.service.ResetPassword(model).subscribe(
            data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Your password has been reset, please verify your cellphone or email inbox.'
                });
                this.router.navigate(["/security/login"]);
            },
            err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error processing data. Please try again later.'
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
    model.username = this.fgv["username"].value;
    model.type = parseInt(this.fgv["type"].value);
    console.log(model);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
