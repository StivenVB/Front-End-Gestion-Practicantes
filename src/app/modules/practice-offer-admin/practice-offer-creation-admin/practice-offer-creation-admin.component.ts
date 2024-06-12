import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { FormsConfig } from '../../../config/forms-config';
import { PracticeOfferAdminService } from '../../../services/practice-offer-admin/practice-offer-admin.service';
import { Router, RouterModule } from '@angular/router';
import { PracticeOfferAdminModel } from '../../../models/practice-offer-admin/practice-offer-admin.model';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSpinnerService } from 'ngx-spinner';

import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-practice-offer-creation-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, NgxSpinnerModule],
  templateUrl: './practice-offer-creation-admin.component.html',
  styleUrl: './practice-offer-creation-admin.component.css'
})
export class PracticeOfferCreationAdminComponent implements OnInit {
  fgValidator!: FormGroup;
  uploadForm!: FormGroup;
  fieldForm!: FormGroup;
  fields: any[] = [];
  minLengthName: number = FormsConfig.MIN_LENGTH_NAME;
  minLengthCode: number = FormsConfig.MIN_LENGTH_CODE;
  isLoading: boolean = false;
  editIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: PracticeOfferAdminService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.FormBuilding();
    this.FormQuestionsBuilding();
  }

  FormBuilding() {
    this.fgValidator = this.fb.group({
    description: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    faculty: ['', [Validators.required]],
    career: ['', [Validators.required]],
    year: ['', [Validators.required]],
    isActive: [null, Validators.required],
    semester: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    });
  }

  FormQuestionsBuilding() {
    this.fieldForm = this.fb.group({
      name: ['', Validators.required],
      label: ['', Validators.required],
      type: ['', Validators.required],
      options: this.fb.array([])
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
      console.log(model);
      this.service.saveNewRecord(model).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Exitoso',
            text: 'El registro se ha guardado correctamente.'
          });
          this.router.navigate(['/practice-offer-admin/list']);
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
  getRecordData(): PracticeOfferAdminModel {
    let model = new PracticeOfferAdminModel();
    model.faculty = this.fgv['faculty'].value;
    model.career = this.fgv['career'].value;
    model.description = this.fgv['description'].value;
    model.endDate = this.fgv['endDate'].value;
    model.semester = this.fgv['semester'].value;
    model.year = this.fgv['year'].value;
    model.startDate = this.fgv['startDate'].value;
    model.isActive = this.fgv['isActive'].value;
    model.formSchema = {
      fields: this.fields
    };
    return model;
  }

  get fgv() {
    return this.fgValidator.controls;
  }

  get options() {
    return this.fieldForm.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.group({
      value: ['', Validators.required],
      label: ['', Validators.required]
    }));
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  addField() {
    if (this.fieldForm.valid) {
      if (this.editIndex !== null) {
        this.fields[this.editIndex] = this.fieldForm.value;
        this.editIndex = null;
      } else {
        this.fields.push(this.fieldForm.value);
      }
      this.fieldForm.reset();
      this.options.clear();
    } else {
      console.log('El formulario de campo no es válido');
    }
  }

  editField(index: number) {
    const field = this.fields[index];
    this.fieldForm.patchValue(field);
    this.options.clear();
    if (field.type === 'select') {
      field.options.forEach((option: { value: any; label: any; }) => {
        this.options.push(this.fb.group({
          value: [option.value, Validators.required],
          label: [option.label, Validators.required]
        }));
      });
    }
    this.editIndex = index;
  }

  deleteField(index: number) {
    this.fields.splice(index, 1);
  }

  openQuestionModal(){
    $('#modalOfferQuestions').modal('show');
  }

  closeQuestionModal(){
    $('#modalOfferQuestions').modal('hide');
  }

  SaveOfferQuestions() {
    console.log(this.fields);
    this.closeQuestionModal();
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'Preguntas agregadas correctamente'
    });
  }
}
