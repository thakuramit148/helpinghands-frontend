import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationLoginComponent } from './organization-login.component';

describe('OrganizationLoginComponent', () => {
  let component: OrganizationLoginComponent;
  let fixture: ComponentFixture<OrganizationLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
