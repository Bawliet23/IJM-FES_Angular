import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamEditComponent } from './exam-edit.component';

describe('ExamEditComponent', () => {
  let component: ExamEditComponent;
  let fixture: ComponentFixture<ExamEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
