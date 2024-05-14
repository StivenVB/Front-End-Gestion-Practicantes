import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticePostulationListComponent } from './practice-postulation-list.component';

describe('PracticePostulationListComponent', () => {
  let component: PracticePostulationListComponent;
  let fixture: ComponentFixture<PracticePostulationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticePostulationListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PracticePostulationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
