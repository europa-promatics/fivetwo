import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbClientProfileComponent } from './db-client-profile.component';

describe('DbClientProfileComponent', () => {
  let component: DbClientProfileComponent;
  let fixture: ComponentFixture<DbClientProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbClientProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
