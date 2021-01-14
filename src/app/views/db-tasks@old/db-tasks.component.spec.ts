import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbTasksComponent } from './db-tasks.component';

describe('DbTasksComponent', () => {
  let component: DbTasksComponent;
  let fixture: ComponentFixture<DbTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
