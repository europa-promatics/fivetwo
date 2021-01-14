import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbInvestmentsComponent } from './db-investments.component';

describe('DbInvestmentsComponent', () => {
  let component: DbInvestmentsComponent;
  let fixture: ComponentFixture<DbInvestmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbInvestmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbInvestmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
