import { DemandeDevis } from '../../../shared/types/DemandeDevis';
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
  stats: {
    value: number;
    count: number;
    label: string;
  }[];
}

export interface DemandeDevisFilter {
  status: number | null | string;
  page: number;
  immatriculation: string;
  nom: string;
}
