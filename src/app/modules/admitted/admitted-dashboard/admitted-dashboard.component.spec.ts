import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittedDashboardComponent } from './admitted-dashboard.component';

describe('AdmittedDashboardComponent', () => {
  let component: AdmittedDashboardComponent;
  let fixture: ComponentFixture<AdmittedDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmittedDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmittedDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
