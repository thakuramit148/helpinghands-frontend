import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationRegisterComponent } from './organization-register.component';

describe('OrganizationRegisterComponent', () => {
  let component: OrganizationRegisterComponent;
  let fixture: ComponentFixture<OrganizationRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
