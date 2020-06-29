import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEventsComponent } from './employee-events.component';

describe('EmployeeEventsComponent', () => {
  let component: EmployeeEventsComponent;
  let fixture: ComponentFixture<EmployeeEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
