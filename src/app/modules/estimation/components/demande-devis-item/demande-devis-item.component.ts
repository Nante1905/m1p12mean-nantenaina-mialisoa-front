import { Component, HostListener, input, output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getDemandeDevisStatusClassname } from '../../../../shared/helpers/devis';
import { DemandeDevis } from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { DEMANDES_DEVIS_STATUS_CLIENT } from '../../constants/devis';
import { RequiredDemandeDevisType } from '../../types/DemandeDevis';

@Component({
  selector: 'app-demande-devis-item',
  imports: [TagModule, DividerModule],
  templateUrl: './demande-devis-item.component.html',
  styleUrl: './demande-devis-item.component.scss',
})
export class DemandeDevisItemComponent {
  demande = input.required<DemandeDevis, RequiredDemandeDevisType>({
    transform: (props: DemandeDevis) => ({
      ...props,
      dateDemande: formatDateToReadable(new Date(props.dateDemande as string)),
      statusLabel: DEMANDES_DEVIS_STATUS_CLIENT[props.status as number],
      marque: props.vehicule.marque as Marque,
    }),
  });
  isSelected = input<boolean>(false);

  getStatusClassname = getDemandeDevisStatusClassname;
  isHovered: boolean = false;
  onSelectDemande = output<DemandeDevis>();

  getMarqueName(): string {
    return typeof this.demande().vehicule.marque === 'string'
      ? (this.demande().vehicule.marque as string)
      : (this.demande().vehicule.marque as Marque).nom;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  @HostListener('click')
  onClick() {
    this.onSelectDemande.emit(this.demande());
  }
}
