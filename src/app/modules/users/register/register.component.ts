import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterModel } from '../../../models/user-register.model';
import { UserRegisterService } from '../../../services/user-register.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';


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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  fgValidator!: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private service: UserRegisterService,
    private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
      identification: ['', [Validators.required, Validators.minLength(7), Validators.pattern(/^[0-9]+$/)]],
      username: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[0-9]+$/)]],
      educationalInstitution: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],
      faculty: [''],
      career: ['']
    });
  }

  UserRegister() {
    if (this.fgValidator.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Formulario inválido'
      });
    } else {
      this.isLoading = true;
      this.spinner.show();
      let model = this.getUserRegisterData();
      this.service.UserRegister(model).subscribe(
        data => {
          if (data) {
            this.isLoading = false;
            Swal.fire({
              icon: 'success',
              title: 'Exitoso',
              text: 'Registro exitoso'
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigate(['/security/login']);
              }
            });
          } else {
            this.isLoading = false;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al registrar datos.'
            });
          }
        },
        error => {
          this.isLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al registrar datos.'
          });
        }
      );
    }
  }

  /**
   * Build a model instance to send it
   */
  getUserRegisterData(): UserRegisterModel {
    let model = new UserRegisterModel();
    model.identification = this.fgv["identification"].value;
    model.username = this.fgv["username"].value;
    model.name = this.fgv["name"].value;
    model.lastName = this.fgv["lastName"].value;
    model.phone = this.fgv["phone"].value;
    model.educationalInstitution = this.fgv["educationalInstitution"].value;
    model.password = this.fgv["password"].value;
    model.faculty = this.fgv["faculty"].value;
    model.career = this.fgv["career"].value;
    model.roleId = 2;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
