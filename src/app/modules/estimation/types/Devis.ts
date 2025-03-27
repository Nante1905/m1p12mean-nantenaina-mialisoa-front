import { Devis, StatutStat } from '../../../shared/types/Devis';
import { Service } from '../../../shared/types/Services';
import { Vehicule } from '../../../shared/types/Vehicule';

export type RequiredDevisType = Pick<
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
> & {
  services: Pick<Service, '_id' | 'nom'>[];
} & {
  vehicule: Pick<Vehicule, 'immatriculation' | 'modele'>;
};

export interface DevisDataResponse {
  items: Devis[];
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
  stats: StatutStat[];
}

export interface DevisListFilter {
  status: number | null;
  immatriculation: string;
  nom: string;
  page: number;
  limit: number;
}
