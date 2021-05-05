import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbInvestAdditionsComponent } from './db-invest-additions.component';

describe('DbInvestAdditionsComponent', () => {
  let component: DbInvestAdditionsComponent;
  let fixture: ComponentFixture<DbInvestAdditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbInvestAdditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbInvestAdditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
