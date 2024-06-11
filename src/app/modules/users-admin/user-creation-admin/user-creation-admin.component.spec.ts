import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCreationAdminComponent } from './user-creation-admin.component';

describe('UserCreationAdminComponent', () => {
  let component: UserCreationAdminComponent;
  let fixture: ComponentFixture<UserCreationAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCreationAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCreationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
