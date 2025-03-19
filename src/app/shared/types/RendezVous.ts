import { Devis } from './Devis';

export interface RendezVous {
  _id: string;
  dateCreation: string;
  date: string;
  devis: Devis;
  status: number;
}
