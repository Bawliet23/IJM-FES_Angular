import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfListComponent } from './prof-list.component';

describe('ProfListComponent', () => {
  let component: ProfListComponent;
  let fixture: ComponentFixture<ProfListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
