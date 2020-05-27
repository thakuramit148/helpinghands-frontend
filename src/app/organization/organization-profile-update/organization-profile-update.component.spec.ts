import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationProfileUpdateComponent } from './organization-profile-update.component';

describe('OrganizationProfileUpdateComponent', () => {
  let component: OrganizationProfileUpdateComponent;
  let fixture: ComponentFixture<OrganizationProfileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationProfileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
