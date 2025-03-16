import { Component, HostListener, input, output } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getDemandeDevisStatusClassname } from '../../../../shared/helpers/devis';
import {
  DemandeDevis,
  DEMANDES_DEVIS_STATUS_CLIENT,
} from '../../constants/devis';
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
      date: formatDateToReadable(new Date(props.date)),
      statusLabel: DEMANDES_DEVIS_STATUS_CLIENT[props.status],
    }),
  });
  isSelected = input<boolean>(false);

  getStatusClassname = getDemandeDevisStatusClassname;
  isHovered: boolean = false;
  onSelectDemande = output<DemandeDevis>();

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

  @HostListener('blur')
  onBlur() {
    console.log('lose focus', this.demande().matricule);
  }
}
