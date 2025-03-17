import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisVehiculeFormComponent } from './devis-vehicule-form.component';

describe('DevisVehiculeFormComponent', () => {
  let component: DevisVehiculeFormComponent;
  let fixture: ComponentFixture<DevisVehiculeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisVehiculeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisVehiculeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
