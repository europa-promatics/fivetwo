import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAddRecordAdviceComponent } from './db-add-record-advice.component';

describe('DbAddRecordAdviceComponent', () => {
  let component: DbAddRecordAdviceComponent;
  let fixture: ComponentFixture<DbAddRecordAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbAddRecordAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAddRecordAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
