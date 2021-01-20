import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbOfficerSidebarComponent } from './db-officer-sidebar.component';

describe('DbOfficerSidebarComponent', () => {
  let component: DbOfficerSidebarComponent;
  let fixture: ComponentFixture<DbOfficerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbOfficerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbOfficerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
