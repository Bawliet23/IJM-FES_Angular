import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantDetailsComponent } from './etudiant-details.component';

describe('EtudiantDetailsComponent', () => {
  let component: EtudiantDetailsComponent;
  let fixture: ComponentFixture<EtudiantDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtudiantDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtudiantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
