import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitudUsuarioComponent } from './form-solicitud-usuario.component';

describe('FormSolicitudUsuarioComponent', () => {
  let component: FormSolicitudUsuarioComponent;
  let fixture: ComponentFixture<FormSolicitudUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormSolicitudUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormSolicitudUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
