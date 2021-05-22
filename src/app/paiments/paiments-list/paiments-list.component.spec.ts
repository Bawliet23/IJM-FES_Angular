import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaimentsListComponent } from './paiments-list.component';

describe('PaimentsListComponent', () => {
  let component: PaimentsListComponent;
  let fixture: ComponentFixture<PaimentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaimentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaimentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
