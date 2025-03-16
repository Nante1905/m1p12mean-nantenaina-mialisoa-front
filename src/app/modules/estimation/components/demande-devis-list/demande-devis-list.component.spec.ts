import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeDevisListComponent } from './demande-devis-list.component';

describe('DemandeDevisListComponent', () => {
  let component: DemandeDevisListComponent;
  let fixture: ComponentFixture<DemandeDevisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeDevisListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeDevisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
