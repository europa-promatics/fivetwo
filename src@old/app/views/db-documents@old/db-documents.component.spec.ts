import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbDocumentsComponent } from './db-documents.component';

describe('DbDocumentsComponent', () => {
  let component: DbDocumentsComponent;
  let fixture: ComponentFixture<DbDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
