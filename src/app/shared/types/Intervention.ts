import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

export interface Intervention {
  _id: string;
  date: string;
  status: string;
  vehicule: Vehicule;
  client: Utilisateur;
  taches?: Tache[];
}

export interface ActionTache {
  step: string;
  value: number;
}

export interface Tache {
  _id: string;
  nom: string;
  estimation: number;
  status: number;
  responsables: Partial<Utilisateur>[];
  actionPermis?: {
    previous?: {
      step: string;
      value: number;
    };
    next?: {
      step: string;
      value: number;
    };
  };
}

export interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: Date;
}
