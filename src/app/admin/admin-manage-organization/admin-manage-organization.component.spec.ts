import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageOrganizationComponent } from './admin-manage-organization.component';

describe('AdminManageOrganizationComponent', () => {
  let component: AdminManageOrganizationComponent;
  let fixture: ComponentFixture<AdminManageOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
