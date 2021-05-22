import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviteCreateComponent } from './activite-create.component';

describe('ActiviteCreateComponent', () => {
  let component: ActiviteCreateComponent;
  let fixture: ComponentFixture<ActiviteCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiviteCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiviteCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
