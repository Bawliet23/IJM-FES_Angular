import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerOverlayComponentComponent } from './spinner-overlay-component.component';

describe('SpinnerOverlayComponentComponent', () => {
  let component: SpinnerOverlayComponentComponent;
  let fixture: ComponentFixture<SpinnerOverlayComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerOverlayComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerOverlayComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
