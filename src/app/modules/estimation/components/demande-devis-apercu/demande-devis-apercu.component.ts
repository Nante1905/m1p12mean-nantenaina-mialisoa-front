import { Component, input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getDemandeDevisStatusClassname } from '../../../../shared/helpers/devis';
import {
  DemandeDevis,
  DEMANDES_DEVIS_STATUS_CLIENT,
} from '../../constants/devis';
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
      date: formatDateToReadable(new Date(props.date)),
      statusLabel: DEMANDES_DEVIS_STATUS_CLIENT[props.status],
    }),
  });
  getStatusClassname = getDemandeDevisStatusClassname;
}
