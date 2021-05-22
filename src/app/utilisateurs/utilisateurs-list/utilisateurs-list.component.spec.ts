import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateursListComponent } from './utilisateurs-list.component';

describe('UtilisateursListComponent', () => {
  let component: UtilisateursListComponent;
  let fixture: ComponentFixture<UtilisateursListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateursListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateursListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
