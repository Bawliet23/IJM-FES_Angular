import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamNotesComponent } from './exam-notes.component';

describe('ExamNotesComponent', () => {
  let component: ExamNotesComponent;
  let fixture: ComponentFixture<ExamNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
