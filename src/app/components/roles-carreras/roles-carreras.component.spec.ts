import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesCarrerasComponent } from './roles-carreras.component';

describe('RolesCarrerasComponent', () => {
  let component: RolesCarrerasComponent;
  let fixture: ComponentFixture<RolesCarrerasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolesCarrerasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesCarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
