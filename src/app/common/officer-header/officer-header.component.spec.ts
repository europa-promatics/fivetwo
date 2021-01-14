import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerHeaderComponent } from './officer-header.component';

describe('OfficerHeaderComponent', () => {
  let component: OfficerHeaderComponent;
  let fixture: ComponentFixture<OfficerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
