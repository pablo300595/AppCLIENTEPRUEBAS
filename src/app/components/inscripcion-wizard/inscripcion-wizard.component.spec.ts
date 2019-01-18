import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionWizardComponent } from './inscripcion-wizard.component';

describe('InscripcionWizardComponent', () => {
  let component: InscripcionWizardComponent;
  let fixture: ComponentFixture<InscripcionWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscripcionWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InscripcionWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
