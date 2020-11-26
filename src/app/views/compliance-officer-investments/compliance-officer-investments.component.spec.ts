import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceOfficerInvestmentsComponent } from './compliance-officer-investments.component';

describe('ComplianceOfficerInvestmentsComponent', () => {
  let component: ComplianceOfficerInvestmentsComponent;
  let fixture: ComponentFixture<ComplianceOfficerInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceOfficerInvestmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceOfficerInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
