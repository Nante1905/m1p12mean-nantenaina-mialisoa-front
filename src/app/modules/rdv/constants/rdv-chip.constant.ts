export const RDV_CHIP: Record<number, { colorClass: string; label: string }> = {
  '-5': {
    colorClass: 'chip-deleted',
    label: 'Annulé',
  },
  0: {
    colorClass: 'chip-pending',
    label: 'En attente',
  },
  5: {
    colorClass: 'chip-accepted',
    label: 'Accepté',
  },
};
