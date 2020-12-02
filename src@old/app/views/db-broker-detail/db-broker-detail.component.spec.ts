import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbBrokerDetailComponent } from './db-broker-detail.component';

describe('DbBrokerDetailComponent', () => {
  let component: DbBrokerDetailComponent;
  let fixture: ComponentFixture<DbBrokerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbBrokerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbBrokerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
