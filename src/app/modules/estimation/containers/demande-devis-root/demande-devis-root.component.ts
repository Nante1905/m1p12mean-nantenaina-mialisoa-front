import { Component } from '@angular/core';
import {
  DemandeDevis,
  DemandeDevisForm,
} from '../../../../shared/types/DemandeDevis';
import { DemandeDevisFormComponent } from '../../components/demande-devis-form/demande-devis-form.component';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-demande-devis-root',
  imports: [DemandeDevisFormComponent],
  providers: [DevisService],
  templateUrl: './demande-devis-root.component.html',
  styleUrl: './demande-devis-root.component.scss',
})
export class DemandeDevisRootComponent {
  constructor(private devisService: DevisService) {}

  onSubmit(demandeDevis: DemandeDevisForm) {
    const data: DemandeDevis = {
      vehiculeId: demandeDevis.vehiculeId,
      vehicule: {
        id: demandeDevis.vehiculeId.toString(),
        marque: demandeDevis.marque,
        modele: demandeDevis.modele,
        annee: demandeDevis.annee,
        kilometrage: demandeDevis.kilometrage,
        motorisation: demandeDevis.motorisation,
      },
      description: demandeDevis.description,
      saveVehicle: demandeDevis.saveVehicule,
    };
    this.devisService.createDemandeDevis(data).subscribe((res) => {
      console.log(res);
    });
  }
}
