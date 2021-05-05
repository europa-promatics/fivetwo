import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbSwitchesComponent } from './db-switches.component';

describe('DbSwitchesComponent', () => {
  let component: DbSwitchesComponent;
  let fixture: ComponentFixture<DbSwitchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbSwitchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbSwitchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
