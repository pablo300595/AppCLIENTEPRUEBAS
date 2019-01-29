import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTemplatePhotoComponent } from './pdf-template-photo.component';

describe('PdfTemplatePhotoComponent', () => {
  let component: PdfTemplatePhotoComponent;
  let fixture: ComponentFixture<PdfTemplatePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTemplatePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTemplatePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
