import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInscripcionesComponent } from './home-inscripciones.component';

describe('HomeInscripcionesComponent', () => {
  let component: HomeInscripcionesComponent;
  let fixture: ComponentFixture<HomeInscripcionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInscripcionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInscripcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
