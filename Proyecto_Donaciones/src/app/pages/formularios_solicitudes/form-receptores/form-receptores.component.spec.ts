import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormReceptoresComponent } from './form-receptores.component';

describe('FormReceptoresComponent', () => {
  let component: FormReceptoresComponent;
  let fixture: ComponentFixture<FormReceptoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormReceptoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormReceptoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
