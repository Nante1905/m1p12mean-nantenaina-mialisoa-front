import { RoleType } from './Auth';
import { Tache } from './Intervention';

export interface Utilisateur {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: RoleType;
  id?: string;
}

export interface TacheWithStringStatus extends Omit<Tache, 'status'> {
  status: string;
}

export interface DetailsMecanicien extends Utilisateur {
  taches: Array<TacheWithStringStatus>;
}
