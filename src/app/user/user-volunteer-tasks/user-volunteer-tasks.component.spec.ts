import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVolunteerTasksComponent } from './user-volunteer-tasks.component';

describe('UserVolunteerTasksComponent', () => {
  let component: UserVolunteerTasksComponent;
  let fixture: ComponentFixture<UserVolunteerTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserVolunteerTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVolunteerTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
