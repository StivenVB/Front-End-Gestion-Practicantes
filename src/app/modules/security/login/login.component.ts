import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsConfig } from '../../../config/forms-config';
import { SecurityService } from '../../../services/security.service';
import { UserModel } from '../../../models/security/user.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

declare const ShowNotificationMessage: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgValidator!: FormGroup;
  document_min_length: number = FormsConfig.DOCUMENT_MIN;

  constructor(
    private fb: FormBuilder,
    private service: SecurityService,
    private route: ActivatedRoute,
    private router: Router
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
        title: 'Oops...',
        text: 'Invalid Form.'
      });
    } else {
      let model = this.getLoginData();
      this.service.LoginUser(model).subscribe(
        data => {
          console.log(data);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Welcome.'
          });
          this.service.saveSession(data);
          this.router.navigate(['/home']);
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid data, please enter a correct user and password.'
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
    model['username'] = this.fgv['username'].value;
    model['password'] = this.fgv['password'].value.toString();
    console.log(model);
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
