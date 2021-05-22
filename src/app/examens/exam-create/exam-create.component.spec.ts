import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCreateComponent } from './exam-create.component';

describe('ExamCreateComponent', () => {
  let component: ExamCreateComponent;
  let fixture: ComponentFixture<ExamCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
