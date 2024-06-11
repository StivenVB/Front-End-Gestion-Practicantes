import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadPracticeFileComponent } from './upload-practice-file.component';

describe('UploadPracticeFileComponent', () => {
  let component: UploadPracticeFileComponent;
  let fixture: ComponentFixture<UploadPracticeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadPracticeFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadPracticeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
