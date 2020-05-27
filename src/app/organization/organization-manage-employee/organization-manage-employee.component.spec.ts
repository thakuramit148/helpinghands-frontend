import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationManageEmployeeComponent } from './organization-manage-employee.component';

describe('OrganizationManageEmployeeComponent', () => {
  let component: OrganizationManageEmployeeComponent;
  let fixture: ComponentFixture<OrganizationManageEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationManageEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationManageEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
