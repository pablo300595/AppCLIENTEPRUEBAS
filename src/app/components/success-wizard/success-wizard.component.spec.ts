import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessWizardComponent } from './success-wizard.component';

describe('SuccessWizardComponent', () => {
  let component: SuccessWizardComponent;
  let fixture: ComponentFixture<SuccessWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
