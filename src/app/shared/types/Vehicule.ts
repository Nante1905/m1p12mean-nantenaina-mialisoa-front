import { Marque } from './Marque';
import { Motorisation } from './Motorisation';

export interface Vehicule {
  _id?: string;
  marque: string | Marque;
  modele: string;
  annee: string;
  motorisation: string | Motorisation;
  immatriculation: string;
}
