import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarDocumentosComponent } from './validar-documentos.component';

describe('ValidarDocumentosComponent', () => {
  let component: ValidarDocumentosComponent;
  let fixture: ComponentFixture<ValidarDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidarDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
