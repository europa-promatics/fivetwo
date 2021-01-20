import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAddInvestorComponent } from './db-add-investor.component';

describe('DbAddInvestorComponent', () => {
  let component: DbAddInvestorComponent;
  let fixture: ComponentFixture<DbAddInvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbAddInvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAddInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
