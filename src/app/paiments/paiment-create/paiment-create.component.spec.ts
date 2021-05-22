import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentCreateComponent } from './paiment-create.component';

describe('PaimentCreateComponent', () => {
  let component: PaimentCreateComponent;
  let fixture: ComponentFixture<PaimentCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaimentCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaimentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
