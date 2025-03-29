export interface InterventionListFilter {
  page: number;
  limit: number;
  immatriculation?: string;
  nom?: string;
}

export interface AddTacheDto {
  heure: number;
  service: string;
  responsables: any[];
}
