import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbBrokerAppointmentComponent } from './db-broker-appointment.component';

describe('DbBrokerAppointmentComponent', () => {
  let component: DbBrokerAppointmentComponent;
  let fixture: ComponentFixture<DbBrokerAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbBrokerAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbBrokerAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
