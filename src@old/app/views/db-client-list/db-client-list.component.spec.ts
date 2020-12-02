import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbClientListComponent } from './db-client-list.component';

describe('DbClientListComponent', () => {
  let component: DbClientListComponent;
  let fixture: ComponentFixture<DbClientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbClientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
