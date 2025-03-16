import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevisItemComponent } from './demande-devis-item.component';

describe('DemandeDevisItemComponent', () => {
  let component: DemandeDevisItemComponent;
  let fixture: ComponentFixture<DemandeDevisItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeDevisItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDevisItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
