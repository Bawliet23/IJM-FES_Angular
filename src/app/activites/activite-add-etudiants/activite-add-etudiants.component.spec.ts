import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteAddEtudiantsComponent } from './activite-add-etudiants.component';

describe('ActiviteAddEtudiantsComponent', () => {
  let component: ActiviteAddEtudiantsComponent;
  let fixture: ComponentFixture<ActiviteAddEtudiantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteAddEtudiantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteAddEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
