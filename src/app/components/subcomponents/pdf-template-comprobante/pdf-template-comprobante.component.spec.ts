import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplateComprobanteComponent } from './pdf-template-comprobante.component';

describe('PdfTemplateComprobanteComponent', () => {
  let component: PdfTemplateComprobanteComponent;
  let fixture: ComponentFixture<PdfTemplateComprobanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplateComprobanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplateComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
