import { DemandeDevis } from '../../../shared/types/DemandeDevis';
import { StatutStat } from '../../../shared/types/Devis';
import { Vehicule } from '../../../shared/types/Vehicule';

export type RequiredDemandeDevisType = {
  _id: string;
  vehicule: Vehicule;
  kilometrage: number;
  description: string;
  status?: number;
  statusLabel?: string;
};

export interface DemandeDevisDataResponse {
  items: DemandeDevis[];
  page: number;
  limit: number;
  totalPage: number;
  totalItems: number;
  stats: StatutStat[];
}

export interface DemandeDevisFilter {
  status: number | null | string;
  page: number;
  immatriculation: string;
  nom: string;
}
