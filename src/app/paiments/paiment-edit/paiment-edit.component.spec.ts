import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentEditComponent } from './paiment-edit.component';

describe('PaimentEditComponent', () => {
  let component: PaimentEditComponent;
  let fixture: ComponentFixture<PaimentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaimentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaimentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
