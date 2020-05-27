import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDonationComponent } from './user-donation.component';

describe('UserDonationComponent', () => {
  let component: UserDonationComponent;
  let fixture: ComponentFixture<UserDonationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDonationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
