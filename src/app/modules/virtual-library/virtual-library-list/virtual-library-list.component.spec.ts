import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualLibraryListComponent } from './virtual-library-list.component';

describe('VirtualLibraryListComponent', () => {
  let component: VirtualLibraryListComponent;
  let fixture: ComponentFixture<VirtualLibraryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualLibraryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VirtualLibraryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
