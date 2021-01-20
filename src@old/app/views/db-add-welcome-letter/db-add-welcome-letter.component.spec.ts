import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbAddWelcomeLetterComponent } from './db-add-welcome-letter.component';

describe('DbAddWelcomeLetterComponent', () => {
  let component: DbAddWelcomeLetterComponent;
  let fixture: ComponentFixture<DbAddWelcomeLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbAddWelcomeLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbAddWelcomeLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
