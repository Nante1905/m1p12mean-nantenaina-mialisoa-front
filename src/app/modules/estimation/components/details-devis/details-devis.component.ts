import { formatCurrency } from '@angular/common';
import { Component, input } from '@angular/core';
import dayjs from 'dayjs';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { Devis } from '../../../../shared/types/Devis';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';

type RequiredDevis = Pick<
  Devis,
  | '_id'
  | 'ref'
  | 'date'
  | 'status'
  | 'services'
  | 'total'
  | 'client'
  | 'vehicule'
  | 'total'
  | 'numero'
>;

@Component({
  selector: 'app-details-devis',
  imports: [CardModule, DividerModule, TableModule],
  templateUrl: './details-devis.component.html',
  styleUrl: './details-devis.component.scss',
})
export class DetailsDevisComponent {
  devis = input(undefined, {
    transform: (d: Devis | undefined) => {
      console.log(d);

      if (d) {
        return {
          ...d,
          date: dayjs(d?.date).format('DD MMMM YYYY'),
        };
      }
      return undefined;
    },
  });

  currencyFormatter = formatCurrency;
  getMarqueName(): string {
    return typeof this.devis()?.vehicule.marque === 'string'
      ? (this.devis()?.vehicule.marque as string)
      : (this.devis()?.vehicule.marque as Marque)?.nom;
  }

  getMotorisationName(): string {
    return typeof this.devis()?.vehicule.motorisation === 'string'
      ? (this.devis()?.vehicule.motorisation as string)
      : (this.devis()?.vehicule.motorisation as Motorisation)?.nom;
  }
}
