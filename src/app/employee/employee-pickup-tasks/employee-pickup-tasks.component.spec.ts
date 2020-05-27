import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePickupTasksComponent } from './employee-pickup-tasks.component';

describe('EmployeePickupTasksComponent', () => {
  let component: EmployeePickupTasksComponent;
  let fixture: ComponentFixture<EmployeePickupTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeePickupTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePickupTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
