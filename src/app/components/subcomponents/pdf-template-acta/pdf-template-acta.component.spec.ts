import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplateActaComponent } from './pdf-template-acta.component';

describe('PdfTemplateActaComponent', () => {
  let component: PdfTemplateActaComponent;
  let fixture: ComponentFixture<PdfTemplateActaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplateActaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplateActaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
