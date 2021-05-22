import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatieresListComponent } from './matieres-list.component';

describe('MatieresListComponent', () => {
  let component: MatieresListComponent;
  let fixture: ComponentFixture<MatieresListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatieresListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatieresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
