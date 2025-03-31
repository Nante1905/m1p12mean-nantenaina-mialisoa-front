import { Tache } from '../../../shared/types/Intervention';
import { Service } from '../../../shared/types/Services';
import { Utilisateur } from '../../../shared/types/Utilisateur';
import { Vehicule } from '../../../shared/types/Vehicule';

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
export interface TacheByStatus {
  label: string;
  value: number;
  taches: Array<Tache>;
}

export interface InterventionDTO {
  _id: string;
  date: string;
  status: number;
  vehicule: Vehicule;
  client: Utilisateur;
  taches: Array<TacheByStatus>;
}

export interface InterventionServiceDTO {
  _id: string;
  date: string;
  status: number;
  vehicule: Vehicule;
  client: Utilisateur;
  services: Array<{ estimation: number } & Service>;
}

export type RequiredInterventionDTO = Pick<
  InterventionDTO,
  '_id' | 'date' | 'status' | 'vehicule' | 'client' | 'taches'
>;

export interface UpdateStatusEventProps {
  task: Tache;
  target: number;
}

export interface AssignRespEventProps {
  task: Tache;
  responsables: Utilisateur[];
}
