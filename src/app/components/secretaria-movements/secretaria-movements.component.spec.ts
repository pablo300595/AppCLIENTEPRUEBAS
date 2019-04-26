import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaMovementsComponent } from './secretaria-movements.component';

describe('SecretariaMovementsComponent', () => {
  let component: SecretariaMovementsComponent;
  let fixture: ComponentFixture<SecretariaMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretariaMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretariaMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
