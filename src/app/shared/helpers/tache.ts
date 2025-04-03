export const getTacheStatusClassName = (status: string) => {
  return `tache-${status
    .toLowerCase()
    .replace(/\s+/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')}`;
};
