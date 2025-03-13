import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevisFormComponent } from './demande-devis-form.component';

describe('DemandeDevisFormComponent', () => {
  let component: DemandeDevisFormComponent;
  let fixture: ComponentFixture<DemandeDevisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeDevisFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDevisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
