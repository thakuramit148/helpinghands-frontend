import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationCategoryComponent } from './organization-category.component';

describe('OrganizationCategoryComponent', () => {
  let component: OrganizationCategoryComponent;
  let fixture: ComponentFixture<OrganizationCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
