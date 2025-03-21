export const CREATED_DEVIS_STATUS = 0;
export const WAITING_RDV_DEVIS_STATUS = 5;
export const RDV_DEVIS_STATUS = 10;
export const DELETED_DEVIS_STATUS = -5;

export const DEVIS_STATUS_LABEL: Record<string, { [key: number]: string }> = {
  CLI: {
    [CREATED_DEVIS_STATUS as number]: 'créé',
    [WAITING_RDV_DEVIS_STATUS as number]: 'attente rdv',
    [RDV_DEVIS_STATUS as number]: 'abouti en rdv',
    [DELETED_DEVIS_STATUS as number]: 'supprimé',
  },
  MGR: {
    [CREATED_DEVIS_STATUS as number]: 'créé',
    [WAITING_RDV_DEVIS_STATUS as number]: 'rdv à confirmer',
    [RDV_DEVIS_STATUS as number]: 'abouti en rdv',
    [DELETED_DEVIS_STATUS as number]: 'supprimé',
  },
};

export const CREATED_DEMANDE_DEVIS_STATUS = 0;
export const DISPO_DEMANDE_DEVIS_STATUS = 5;

export const DEMANDES_DEVIS_STATUS: Record<string, { [key: number]: string }> =
  {
    CLI: {
      [CREATED_DEMANDE_DEVIS_STATUS as number]: 'attente',
      [DISPO_DEMANDE_DEVIS_STATUS as number]: 'dispo',
    },
    MGR: {
      [CREATED_DEMANDE_DEVIS_STATUS as number]: 'attente de réponse',
      [DISPO_DEMANDE_DEVIS_STATUS as number]: 'répondu',
    },
  };
