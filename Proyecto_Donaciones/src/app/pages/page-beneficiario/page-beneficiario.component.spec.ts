import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBeneficiarioComponent } from './page-beneficiario.component';

describe('PageBeneficiarioComponent', () => {
  let component: PageBeneficiarioComponent;
  let fixture: ComponentFixture<PageBeneficiarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageBeneficiarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
