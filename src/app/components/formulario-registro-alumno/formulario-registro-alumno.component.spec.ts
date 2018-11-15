import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRegistroAlumnoComponent } from './formulario-registro-alumno.component';

describe('FormularioRegistroAlumnoComponent', () => {
  let component: FormularioRegistroAlumnoComponent;
  let fixture: ComponentFixture<FormularioRegistroAlumnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioRegistroAlumnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRegistroAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
