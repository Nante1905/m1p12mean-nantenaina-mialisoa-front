import { Utilisateur } from './Utilisateur';
import { Vehicule } from './Vehicule';

export interface Intervention {
  _id: string;
  date: string;
  status: string;
  vehicule: Vehicule;
  client: Utilisateur;
}

export interface Tache {
  _id: string;
  nom: string;
  estimation: number;
  responsable: Partial<Utilisateur>[];
}

export interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: Date;
}
