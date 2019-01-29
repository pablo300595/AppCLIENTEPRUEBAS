import { TestBed, inject } from '@angular/core/testing';

import { DropzoneTemplatesService } from './dropzone-templates.service';

describe('DropzoneTemplatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropzoneTemplatesService]
    });
  });

  it('should be created', inject([DropzoneTemplatesService], (service: DropzoneTemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
