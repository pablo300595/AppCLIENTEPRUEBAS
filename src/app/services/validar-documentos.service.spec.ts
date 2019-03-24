import { TestBed, inject } from '@angular/core/testing';

import { ValidarDocumentosService } from './validar-documentos.service';

describe('ValidarDocumentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidarDocumentosService]
    });
  });

  it('should be created', inject([ValidarDocumentosService], (service: ValidarDocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
