export interface DemandeDevis {
  vehicule: number;
  marque: string;
  modele: string;
  annee: string;
  motorisation: string;
  description: string;
}

export type RequiredDemandeDevisType = {
  id: string;

  matricule: string;
  modele: string;
  date: string;
  description: string;
  status: number;
  statusLabel?: string;
};
