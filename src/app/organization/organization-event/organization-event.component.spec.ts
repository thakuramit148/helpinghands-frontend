import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationEventComponent } from './organization-event.component';

describe('OrganizationEventComponent', () => {
  let component: OrganizationEventComponent;
  let fixture: ComponentFixture<OrganizationEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
