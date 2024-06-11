import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeOfferEditionAdminComponent } from './practice-offer-edition-admin.component';

describe('PracticeOfferEditionAdminComponent', () => {
  let component: PracticeOfferEditionAdminComponent;
  let fixture: ComponentFixture<PracticeOfferEditionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeOfferEditionAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticeOfferEditionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
