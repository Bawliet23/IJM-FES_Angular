import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfDetailsComponent } from './prof-details.component';

describe('ProfDetailsComponent', () => {
  let component: ProfDetailsComponent;
  let fixture: ComponentFixture<ProfDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
