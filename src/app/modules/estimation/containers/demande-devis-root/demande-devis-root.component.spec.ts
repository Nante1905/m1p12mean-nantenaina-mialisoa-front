import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevisRootComponent } from './demande-devis-root.component';

describe('DemandeDevisRootComponent', () => {
  let component: DemandeDevisRootComponent;
  let fixture: ComponentFixture<DemandeDevisRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeDevisRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDevisRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
