import { RoleType } from './Auth';

export interface Utilisateur {
  id?: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  role: RoleType;
}
