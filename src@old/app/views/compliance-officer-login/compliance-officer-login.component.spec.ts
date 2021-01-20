import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceOfficerLoginComponent } from './compliance-officer-login.component';

describe('ComplianceOfficerLoginComponent', () => {
  let component: ComplianceOfficerLoginComponent;
  let fixture: ComponentFixture<ComplianceOfficerLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceOfficerLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceOfficerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
