import { TestBed, inject } from '@angular/core/testing';

import { SecretariaService } from './secretaria.service';

describe('SecretariaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecretariaService]
    });
  });

  it('should be created', inject([SecretariaService], (service: SecretariaService) => {
    expect(service).toBeTruthy();
  }));
});
