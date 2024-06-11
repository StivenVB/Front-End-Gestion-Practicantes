import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeOffersListComponent } from './practice-offers-list.component';

describe('PracticeOffersListComponent', () => {
  let component: PracticeOffersListComponent;
  let fixture: ComponentFixture<PracticeOffersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeOffersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticeOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
