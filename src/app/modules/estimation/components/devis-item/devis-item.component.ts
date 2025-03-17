import { Component, HostListener, input, output } from '@angular/core';
import dayjs from 'dayjs';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getDevisStatusClassname } from '../../../../shared/helpers/devis';
import { Devis } from '../../../../shared/types/Devis';
import { DEVIS_STATUS_LABEL } from '../../constants/devis';
import { RequiredDevisType } from '../../types/Devis';

@Component({
  selector: 'app-devis-item',
  imports: [TagModule, DividerModule],
  templateUrl: './devis-item.component.html',
  styleUrl: './devis-item.component.scss',
})
export class DevisItemComponent {
  devis = input.required<Devis, RequiredDevisType>({
    transform: (props: Devis) => ({
      ...props,
      date: formatDateToReadable(dayjs(props.date as string).toDate()),
      statusLabel: DEVIS_STATUS_LABEL[props.status as number],
    }),
  });

  isSelected = input<boolean>(false);
  isHovered = false;
  getStatusClassname = getDevisStatusClassname;

  onSelectDevis = output<Devis>();

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
    this.onSelectDevis.emit(this.devis());
  }
}
