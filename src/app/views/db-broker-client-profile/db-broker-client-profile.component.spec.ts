import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbBrokerClientProfileComponent } from './db-broker-client-profile.component';

describe('DbBrokerClientProfileComponent', () => {
  let component: DbBrokerClientProfileComponent;
  let fixture: ComponentFixture<DbBrokerClientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbBrokerClientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbBrokerClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
