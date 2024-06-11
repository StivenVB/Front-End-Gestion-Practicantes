import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditionAdminComponent } from './user-edition-admin.component';

describe('UserEditionAdminComponent', () => {
  let component: UserEditionAdminComponent;
  let fixture: ComponentFixture<UserEditionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditionAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserEditionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
