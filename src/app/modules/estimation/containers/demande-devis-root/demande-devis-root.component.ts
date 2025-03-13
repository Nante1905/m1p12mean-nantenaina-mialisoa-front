import { Component } from '@angular/core';
import { DemandeDevisFormComponent } from '../../components/demande-devis-form/demande-devis-form.component';
import { DemandeDevis } from '../../types/DemandeDevis';

@Component({
  selector: 'app-demande-devis-root',
  imports: [DemandeDevisFormComponent],
  templateUrl: './demande-devis-root.component.html',
  styleUrl: './demande-devis-root.component.scss',
})
export class DemandeDevisRootComponent {
  constructor() {}

  onSubmit(demandeDevis: DemandeDevis) {
    console.log(demandeDevis);
  }
}
