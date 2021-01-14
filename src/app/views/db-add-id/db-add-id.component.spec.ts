import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAddIdComponent } from './db-add-id.component';

describe('DbAddIdComponent', () => {
  let component: DbAddIdComponent;
  let fixture: ComponentFixture<DbAddIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbAddIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAddIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
