import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbLetterAuthorityComponent } from './db-letter-authority.component';

describe('DbLetterAuthorityComponent', () => {
  let component: DbLetterAuthorityComponent;
  let fixture: ComponentFixture<DbLetterAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbLetterAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbLetterAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
