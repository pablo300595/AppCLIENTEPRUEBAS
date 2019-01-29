import { TestBed, inject } from '@angular/core/testing';

import { FormularioRegistroService } from './formulario-registro.service';

describe('FormularioRegistroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormularioRegistroService]
    });
  });

  it('should be created', inject([FormularioRegistroService], (service: FormularioRegistroService) => {
    expect(service).toBeTruthy();
  }));
});
