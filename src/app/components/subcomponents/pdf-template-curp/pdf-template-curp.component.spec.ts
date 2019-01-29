import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplateCurpComponent } from './pdf-template-curp.component';

describe('PdfTemplateCurpComponent', () => {
  let component: PdfTemplateCurpComponent;
  let fixture: ComponentFixture<PdfTemplateCurpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplateCurpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplateCurpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
