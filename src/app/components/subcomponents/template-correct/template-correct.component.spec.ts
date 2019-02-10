import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateCorrectComponent } from './template-correct.component';

describe('TemplateCorrectComponent', () => {
  let component: TemplateCorrectComponent;
  let fixture: ComponentFixture<TemplateCorrectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateCorrectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateCorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
