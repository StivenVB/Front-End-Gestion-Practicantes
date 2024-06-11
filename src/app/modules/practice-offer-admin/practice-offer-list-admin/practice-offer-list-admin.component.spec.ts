import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeOfferListAdminComponent } from './practice-offer-list-admin.component';

describe('PracticeOfferListAdminComponent', () => {
  let component: PracticeOfferListAdminComponent;
  let fixture: ComponentFixture<PracticeOfferListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeOfferListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticeOfferListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
