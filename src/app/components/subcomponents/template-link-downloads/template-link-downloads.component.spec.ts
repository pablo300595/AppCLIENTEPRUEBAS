import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateLinkDownloadsComponent } from './template-link-downloads.component';

describe('TemplateLinkDownloadsComponent', () => {
  let component: TemplateLinkDownloadsComponent;
  let fixture: ComponentFixture<TemplateLinkDownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateLinkDownloadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateLinkDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
