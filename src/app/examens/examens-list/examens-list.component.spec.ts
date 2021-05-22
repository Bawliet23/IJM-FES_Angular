import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamensListComponent } from './examens-list.component';

describe('ExamensListComponent', () => {
  let component: ExamensListComponent;
  let fixture: ComponentFixture<ExamensListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamensListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
