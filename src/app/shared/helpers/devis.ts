import {
  DEMANDES_DEVIS_STATUS_CLIENT,
  DEVIS_STATUS_LABEL,
} from '../../modules/estimation/constants/devis';

export const getDemandeDevisStatusClassname = (status?: number) => {
  return status != undefined
    ? `demande-${DEMANDES_DEVIS_STATUS_CLIENT[status]
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')}`
    : '';
};

export const getDevisStatusClassname = (status?: number) => {
  return status != undefined
    ? `devis-${DEVIS_STATUS_LABEL[status]
        .toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')}`
    : '';
};
