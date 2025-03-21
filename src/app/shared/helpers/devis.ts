import {
  DEMANDES_DEVIS_STATUS,
  DEVIS_STATUS_LABEL,
} from '../../modules/estimation/constants/devis';
import { RoleType } from '../types/Auth';

export const getDevisStatusLabel = (role: RoleType) => {
  return DEVIS_STATUS_LABEL[role];
};

export const getDemandeDevisStatusLabel = (role: RoleType) => {
  return DEMANDES_DEVIS_STATUS[role];
};

export const getDemandeDevisStatusClassname = (
  role: RoleType,
  status?: number
) => {
  return status != undefined
    ? `demande-${getDemandeDevisStatusLabel(role)
        [status].toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')}`
    : '';
};

export const getDevisStatusClassname = (role: RoleType, status?: number) => {
  return status != undefined
    ? `devis-${getDevisStatusLabel(role)
        [status].toLowerCase()
        .replace(/\s+/g, '-')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')}`
    : '';
};
