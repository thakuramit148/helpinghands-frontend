import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchOrganizationComponent } from './user-search-organization.component';

describe('UserSearchOrganizationComponent', () => {
  let component: UserSearchOrganizationComponent;
  let fixture: ComponentFixture<UserSearchOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
