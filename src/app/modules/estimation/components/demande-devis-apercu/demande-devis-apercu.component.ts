import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getDemandeDevisStatusClassname } from '../../../../shared/helpers/devis';
import { DemandeDevis } from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { DEMANDES_DEVIS_STATUS_CLIENT } from '../../constants/devis';
import { RequiredDemandeDevisType } from '../../types/DemandeDevis';

@Component({
  selector: 'app-demande-devis-apercu',
  imports: [TagModule],
  templateUrl: './demande-devis-apercu.component.html',
  styleUrl: './demande-devis-apercu.component.scss',
})
export class DemandeDevisApercuComponent {
  demande = input.required<DemandeDevis, RequiredDemandeDevisType>({
    transform: (props: DemandeDevis) => ({
      ...props,
      dateDemande: formatDateToReadable(new Date(props.dateDemande as string)),
      statusLabel: DEMANDES_DEVIS_STATUS_CLIENT[props.status as number],
    }),
  });
  getStatusClassname = getDemandeDevisStatusClassname;

  getMarqueName(): string {
    return typeof this.demande().vehicule.marque === 'string'
      ? (this.demande().vehicule.marque as string)
      : (this.demande().vehicule.marque as Marque).nom;
  }
}
