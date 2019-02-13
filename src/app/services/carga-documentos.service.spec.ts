import { TestBed, inject } from '@angular/core/testing';

import { CargaDocumentosService } from './carga-documentos.service';

describe('CargaDocumentosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CargaDocumentosService]
    });
  });

  it('should be created', inject([CargaDocumentosService], (service: CargaDocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
