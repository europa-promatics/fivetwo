import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeadListComponent } from './add-lead-list.component';

describe('AddLeadListComponent', () => {
  let component: AddLeadListComponent;
  let fixture: ComponentFixture<AddLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
