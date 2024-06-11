import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeOfferCreationAdminComponent } from './practice-offer-creation-admin.component';

describe('PracticeOfferCreationAdminComponent', () => {
  let component: PracticeOfferCreationAdminComponent;
  let fixture: ComponentFixture<PracticeOfferCreationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeOfferCreationAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticeOfferCreationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
