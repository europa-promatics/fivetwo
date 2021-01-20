import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftClientsComponent } from './draft-clients.component';

describe('DraftClientsComponent', () => {
  let component: DraftClientsComponent;
  let fixture: ComponentFixture<DraftClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
