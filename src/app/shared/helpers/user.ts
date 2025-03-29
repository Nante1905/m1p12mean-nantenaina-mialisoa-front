import { Utilisateur } from '../types/Utilisateur';

export const getUserCompleteInitial = (
  user: Utilisateur | Partial<Utilisateur>
) => {
  return `${user.nom ? user.nom[0] : ''}${user.prenom ? user.prenom[0] : ''}`;
};

export const getUserFullname = (user: Utilisateur | Partial<Utilisateur>) =>
  `${user.nom ? user.nom : ''}${user.prenom ? user.prenom : ''}`;
