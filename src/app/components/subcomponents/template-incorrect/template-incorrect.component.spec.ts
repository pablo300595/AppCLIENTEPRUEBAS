import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateIncorrectComponent } from './template-incorrect.component';

describe('TemplateIncorrectComponent', () => {
  let component: TemplateIncorrectComponent;
  let fixture: ComponentFixture<TemplateIncorrectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateIncorrectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateIncorrectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
