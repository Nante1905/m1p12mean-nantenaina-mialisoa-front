import { DEMANDES_DEVIS_STATUS_CLIENT } from '../../modules/estimation/constants/devis';

export const getDemandeDevisStatusClassname = (status: number) =>
  `demande-${DEMANDES_DEVIS_STATUS_CLIENT[status].toLowerCase()}`;
