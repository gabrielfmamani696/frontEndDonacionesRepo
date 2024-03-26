import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRepOrgReceptoraComponent } from './form-rep-org-receptora.component';

describe('FormRepOrgReceptoraComponent', () => {
  let component: FormRepOrgReceptoraComponent;
  let fixture: ComponentFixture<FormRepOrgReceptoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRepOrgReceptoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormRepOrgReceptoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
