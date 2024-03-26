import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDonacionesComponent } from './form-donaciones.component';

describe('FormDonacionesComponent', () => {
  let component: FormDonacionesComponent;
  let fixture: ComponentFixture<FormDonacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormDonacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormDonacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
