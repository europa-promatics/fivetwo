import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbOfficerHeaderComponent } from './db-officer-header.component';

describe('DbOfficerHeaderComponent', () => {
  let component: DbOfficerHeaderComponent;
  let fixture: ComponentFixture<DbOfficerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbOfficerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbOfficerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
