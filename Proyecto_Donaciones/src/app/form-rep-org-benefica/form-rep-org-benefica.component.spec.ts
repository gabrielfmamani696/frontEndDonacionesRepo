import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRepOrgBeneficaComponent } from './form-rep-org-benefica.component';

describe('FormRepOrgBeneficaComponent', () => {
  let component: FormRepOrgBeneficaComponent;
  let fixture: ComponentFixture<FormRepOrgBeneficaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRepOrgBeneficaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRepOrgBeneficaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
