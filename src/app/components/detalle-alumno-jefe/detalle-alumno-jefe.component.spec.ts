import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAlumnoJefeComponent } from './detalle-alumno-jefe.component';

describe('DetalleAlumnoJefeComponent', () => {
  let component: DetalleAlumnoJefeComponent;
  let fixture: ComponentFixture<DetalleAlumnoJefeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAlumnoJefeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAlumnoJefeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
