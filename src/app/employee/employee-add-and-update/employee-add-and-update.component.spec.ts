import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddAndUpdateComponent } from './employee-add-and-update.component';

describe('EmployeeAddAndUpdateComponent', () => {
  let component: EmployeeAddAndUpdateComponent;
  let fixture: ComponentFixture<EmployeeAddAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
