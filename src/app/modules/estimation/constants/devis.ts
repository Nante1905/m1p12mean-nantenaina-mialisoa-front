export interface DemandeDevis {
  id: string;
  matricule: string;
  modele: string;
  date: string; // Format ISO avec date et heure
  description: string;
  status: number;
  statusLabel?: string;
}

export const DEMANDES_DEVIS: DemandeDevis[] = [
  {
    id: '1',
    matricule: 'AB-123-CD',
    modele: 'Toyota Corolla',
    date: '2023-10-01T10:30:00Z',
    description: 'Changement des plaquettes de frein et révision générale.',
    status: 0,
  },
  {
    id: 'er6',
    matricule: 'EF-456-GH',
    modele: 'Renault Clio',
    date: '2023-10-02T14:45:00Z',
    description: 'Réparation du pare-chocs avant et remplacement des phares.',
    status: 0,
  },
  {
    id: '2e',
    matricule: 'IJ-789-KL',
    modele: 'Peugeot 208',
    date: '2023-10-03T09:15:00Z',
    description: 'Vidange moteur et remplacement du filtre à huile.',
    status: 5,
  },
  {
    id: '578',
    matricule: 'MN-012-OP',
    modele: 'Ford Fiesta',
    date: '2023-10-04T11:00:00Z',
    description: 'Réparation de la climatisation et contrôle des pneus.',
    status: 10,
  },
  {
    id: '2e3z',
    matricule: 'QR-345-ST',
    modele: 'Volkswagen Golf',
    date: '2023-10-05T16:30:00Z',
    description:
      'Remplacement de la batterie et vérification du système électrique.',
    status: 5,
  },
];

export const DEMANDES_DEVIS_STATUS_CLIENT_LABEL: { [key: string]: number } = {
  attente: 0,
  dispo: 5,
  rdv: 10,
};

export const DEMANDES_DEVIS_STATUS_CLIENT: { [key: number]: string } =
  Object.keys(DEMANDES_DEVIS_STATUS_CLIENT_LABEL).reduce((acc, key) => {
    const value = DEMANDES_DEVIS_STATUS_CLIENT_LABEL[key];
    acc[value] = key;
    return acc;
  }, {} as { [key: number]: string });
