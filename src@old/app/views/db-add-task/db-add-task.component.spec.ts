import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAddTaskComponent } from './db-add-task.component';

describe('DbAddTaskComponent', () => {
  let component: DbAddTaskComponent;
  let fixture: ComponentFixture<DbAddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbAddTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
