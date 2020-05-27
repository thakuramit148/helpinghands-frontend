import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPickupTasksComponent } from './user-pickup-tasks.component';

describe('UserPickupTasksComponent', () => {
  let component: UserPickupTasksComponent;
  let fixture: ComponentFixture<UserPickupTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPickupTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPickupTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
