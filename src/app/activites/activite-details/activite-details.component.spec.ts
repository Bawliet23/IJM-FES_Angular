import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteDetailsComponent } from './activite-details.component';

describe('ActiviteDetailsComponent', () => {
  let component: ActiviteDetailsComponent;
  let fixture: ComponentFixture<ActiviteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
