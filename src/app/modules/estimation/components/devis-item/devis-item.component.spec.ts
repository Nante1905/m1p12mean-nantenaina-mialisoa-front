import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisItemComponent } from './devis-item.component';

describe('DevisItemComponent', () => {
  let component: DevisItemComponent;
  let fixture: ComponentFixture<DevisItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
