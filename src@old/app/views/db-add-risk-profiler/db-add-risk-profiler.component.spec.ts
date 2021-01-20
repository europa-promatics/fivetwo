import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAddRiskProfilerComponent } from './db-add-risk-profiler.component';

describe('DbAddRiskProfilerComponent', () => {
  let component: DbAddRiskProfilerComponent;
  let fixture: ComponentFixture<DbAddRiskProfilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbAddRiskProfilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAddRiskProfilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
