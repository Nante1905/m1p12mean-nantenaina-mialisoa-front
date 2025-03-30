import { RoleType } from './Auth';

export interface Utilisateur {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: RoleType;
  id?: string;
}
