import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplateCertificadoComponent } from './pdf-template-certificado.component';

describe('PdfTemplateCertificadoComponent', () => {
  let component: PdfTemplateCertificadoComponent;
  let fixture: ComponentFixture<PdfTemplateCertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplateCertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplateCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
