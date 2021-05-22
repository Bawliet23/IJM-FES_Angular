import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteAddHoraireComponent } from './activite-add-horaire.component';

describe('ActiviteAddHoraireComponent', () => {
  let component: ActiviteAddHoraireComponent;
  let fixture: ComponentFixture<ActiviteAddHoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteAddHoraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteAddHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
