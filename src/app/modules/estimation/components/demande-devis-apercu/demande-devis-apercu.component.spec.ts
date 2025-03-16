import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevisApercuComponent } from './demande-devis-apercu.component';

describe('DemandeDevisApercuComponent', () => {
  let component: DemandeDevisApercuComponent;
  let fixture: ComponentFixture<DemandeDevisApercuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeDevisApercuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDevisApercuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
