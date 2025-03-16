import { DEMANDES_DEVIS_STATUS_CLIENT } from '../../modules/estimation/constants/devis';

export const getDemandeDevisStatusClassname = (status?: number) => {
  return status != undefined
    ? `demande-${DEMANDES_DEVIS_STATUS_CLIENT[status].toLowerCase()}`
    : '';
};
