import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfCreateComponent } from './prof-create.component';

describe('ProfCreateComponent', () => {
  let component: ProfCreateComponent;
  let fixture: ComponentFixture<ProfCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
