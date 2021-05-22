import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereCreateComponent } from './matiere-create.component';

describe('MatiereCreateComponent', () => {
  let component: MatiereCreateComponent;
  let fixture: ComponentFixture<MatiereCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatiereCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatiereCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
