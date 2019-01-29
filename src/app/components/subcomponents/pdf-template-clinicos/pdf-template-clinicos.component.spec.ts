import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplateClinicosComponent } from './pdf-template-clinicos.component';

describe('PdfTemplateClinicosComponent', () => {
  let component: PdfTemplateClinicosComponent;
  let fixture: ComponentFixture<PdfTemplateClinicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplateClinicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplateClinicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
