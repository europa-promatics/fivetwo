import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplianceOfficerSetPasswordComponent } from './compliance-officer-set-password.component';

describe('ComplianceOfficerSetPasswordComponent', () => {
  let component: ComplianceOfficerSetPasswordComponent;
  let fixture: ComponentFixture<ComplianceOfficerSetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplianceOfficerSetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplianceOfficerSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
