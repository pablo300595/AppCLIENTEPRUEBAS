import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplatePhotoJPGComponent } from './pdf-template-photo-jpg.component';

describe('PdfTemplatePhotoJPGComponent', () => {
  let component: PdfTemplatePhotoJPGComponent;
  let fixture: ComponentFixture<PdfTemplatePhotoJPGComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplatePhotoJPGComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplatePhotoJPGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
