import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAddDisclosureComponent } from './db-add-disclosure.component';

describe('DbAddDisclosureComponent', () => {
  let component: DbAddDisclosureComponent;
  let fixture: ComponentFixture<DbAddDisclosureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbAddDisclosureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAddDisclosureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
