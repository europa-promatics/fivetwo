import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceOfficerForgotComponent } from './compliance-officer-forgot.component';

describe('ComplianceOfficerForgotComponent', () => {
  let component: ComplianceOfficerForgotComponent;
  let fixture: ComponentFixture<ComplianceOfficerForgotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceOfficerForgotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceOfficerForgotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
