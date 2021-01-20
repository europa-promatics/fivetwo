import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbLeadListComponent } from './db-lead-list.component';

describe('DbLeadListComponent', () => {
  let component: DbLeadListComponent;
  let fixture: ComponentFixture<DbLeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbLeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbLeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
