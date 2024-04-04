import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDonadorComponent } from './page-donador.component';

describe('PageDonadorComponent', () => {
  let component: PageDonadorComponent;
  let fixture: ComponentFixture<PageDonadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageDonadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageDonadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
