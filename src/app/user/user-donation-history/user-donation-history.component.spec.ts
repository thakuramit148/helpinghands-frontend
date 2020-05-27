import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDonationHistoryComponent } from './user-donation-history.component';

describe('UserDonationHistoryComponent', () => {
  let component: UserDonationHistoryComponent;
  let fixture: ComponentFixture<UserDonationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDonationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDonationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
