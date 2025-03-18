import { Component, input } from '@angular/core';
import dayjs from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getDevisStatusClassname } from '../../../../shared/helpers/devis';
import { Devis } from '../../../../shared/types/Devis';
import {
  CREATED_DEVIS_STATUS,
  DELETED_DEVIS_STATUS,
  DEVIS_STATUS_LABEL,
} from '../../constants/devis';
import { RequiredDevisType } from '../../types/Devis';

@Component({
  selector: 'app-devis-apercu',
  imports: [TagModule, DividerModule, ButtonModule],
  templateUrl: './devis-apercu.component.html',
  styleUrl: './devis-apercu.component.scss',
})
export class DevisApercuComponent {
  CREATED = CREATED_DEVIS_STATUS;
  DELETED = DELETED_DEVIS_STATUS;
  devis = input.required<Devis, RequiredDevisType>({
    transform: (props: Devis) => ({
      ...props,
      date: formatDateToReadable(dayjs(props.date as string).toDate()),
      statusLabel: DEVIS_STATUS_LABEL[props.status as number],
    }),
  });

  getStatusClassname = getDevisStatusClassname;
}
