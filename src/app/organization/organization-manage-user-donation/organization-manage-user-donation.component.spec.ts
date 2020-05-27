import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationManageUserDonationComponent } from './organization-manage-user-donation.component';

describe('OrganizationManageUserDonationComponent', () => {
  let component: OrganizationManageUserDonationComponent;
  let fixture: ComponentFixture<OrganizationManageUserDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationManageUserDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationManageUserDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
