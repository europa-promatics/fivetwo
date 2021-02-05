import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbInstructionsComponent } from './db-instructions.component';

describe('DbInstructionsComponent', () => {
  let component: DbInstructionsComponent;
  let fixture: ComponentFixture<DbInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
