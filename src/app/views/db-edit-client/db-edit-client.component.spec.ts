import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbEditClientComponent } from './db-edit-client.component';

describe('DbEditClientComponent', () => {
  let component: DbEditClientComponent;
  let fixture: ComponentFixture<DbEditClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbEditClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbEditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
