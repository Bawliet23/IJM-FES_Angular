import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfAddHoraireComponent } from './prof-add-horaire.component';

describe('ProfAddHoraireComponent', () => {
  let component: ProfAddHoraireComponent;
  let fixture: ComponentFixture<ProfAddHoraireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfAddHoraireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfAddHoraireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
