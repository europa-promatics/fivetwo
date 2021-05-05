import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DbRepurchaseComponent } from './db-repurchase.component';

describe('DbRepurchaseComponent', () => {
  let component: DbRepurchaseComponent;
  let fixture: ComponentFixture<DbRepurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DbRepurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbRepurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
