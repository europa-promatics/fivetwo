import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbBrokerListComponent } from './db-broker-list.component';

describe('DbBrokerListComponent', () => {
  let component: DbBrokerListComponent;
  let fixture: ComponentFixture<DbBrokerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbBrokerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbBrokerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
