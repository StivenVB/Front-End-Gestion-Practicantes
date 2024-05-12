import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { UserRegisterModel } from '../../../models/user-register.model';
import { UserRegisterService } from '../../../services/user-register.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  fgValidator!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: UserRegisterService,
    private route: ActivatedRoute,
    private router: Router
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
      confirmPassword: ['', [Validators.required, matchValidator('password')]]
    });
  }

  UserRegister() {
    if (this.fgValidator.invalid) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Formulario inválido'
        });
    } else {
        let model = this.getUserRegisterData();
        console.log(model);
        this.service.UserRegister(model).subscribe(
            data => {
                console.log(JSON.stringify(data));
                if (data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Registration has been successful. You can find the password in your mail inbox.'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.router.navigate(['/security/login']);
                        }
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error registering data.'
                    });
                }
            },
            error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error registering data.'
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
    model.roleId = 2;
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }
}
