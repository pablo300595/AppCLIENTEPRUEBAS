import { TestBed, inject } from '@angular/core/testing';

import { SecretariaMovementsService } from './secretaria-movements.service';

describe('SecretariaMovementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecretariaMovementsService]
    });
  });

  it('should be created', inject([SecretariaMovementsService], (service: SecretariaMovementsService) => {
    expect(service).toBeTruthy();
  }));
});
