import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceOfficerTasksComponent } from './compliance-officer-tasks.component';

describe('ComplianceOfficerTasksComponent', () => {
  let component: ComplianceOfficerTasksComponent;
  let fixture: ComponentFixture<ComplianceOfficerTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceOfficerTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceOfficerTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
