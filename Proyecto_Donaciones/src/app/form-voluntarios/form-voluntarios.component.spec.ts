import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVoluntariosComponent } from './form-voluntarios.component';

describe('FormVoluntariosComponent', () => {
  let component: FormVoluntariosComponent;
  let fixture: ComponentFixture<FormVoluntariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormVoluntariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormVoluntariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
