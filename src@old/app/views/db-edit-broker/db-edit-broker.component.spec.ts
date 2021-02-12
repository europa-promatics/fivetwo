import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbEditBrokerComponent } from './db-edit-broker.component';

describe('DbEditBrokerComponent', () => {
  let component: DbEditBrokerComponent;
  let fixture: ComponentFixture<DbEditBrokerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbEditBrokerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbEditBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
