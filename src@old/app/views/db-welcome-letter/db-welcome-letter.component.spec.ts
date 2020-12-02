import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbWelcomeLetterComponent } from './db-welcome-letter.component';

describe('DbWelcomeLetterComponent', () => {
  let component: DbWelcomeLetterComponent;
  let fixture: ComponentFixture<DbWelcomeLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbWelcomeLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbWelcomeLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
