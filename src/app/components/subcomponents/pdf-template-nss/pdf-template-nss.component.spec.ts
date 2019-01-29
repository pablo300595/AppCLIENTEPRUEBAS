import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplateNssComponent } from './pdf-template-nss.component';

describe('PdfTemplateNssComponent', () => {
  let component: PdfTemplateNssComponent;
  let fixture: ComponentFixture<PdfTemplateNssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplateNssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplateNssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
