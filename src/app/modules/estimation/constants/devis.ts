import { DemandeDevis } from '../../../shared/types/DemandeDevis';

export const DEMANDES_DEVIS: DemandeDevis[] = [
  {
    _id: '67d6ca20c4ebb198c6e43d48',
    vehicule: {
      _id: '67d672dd52f6296c789cacca',
      marque: {
        _id: '67d5c016fcc1f5ed54a9e096',
        nom: 'BMW',
      },
      modele: 'M3 competition',
      annee: 2012,
      motorisation: {
        _id: '67d5aebafcc1f5ed54a9e08b',
        nom: 'Essence',
      },
      immatriculation: '2901TAA',
    },
    description: 'Maneno be foana lay vitesse',
    kilometrage: 520,
    status: 0,
    dateDemande: '2025-03-16T12:54:56.355Z',
    utilisateur: {
      id: '67d6c7d3c34d5a3c68c2f570',
      nom: 'Rakoto',
      prenom: 'Hervé',
    },
  },
  {
    _id: '67d6da34fa1ed23c7c1815df',
    vehicule: {
      _id: '67d672dd52f6296c789cacca',
      marque: {
        _id: '67d5c016fcc1f5ed54a9e096',
        nom: 'BMW',
      },
      modele: 'M3 competition',
      annee: 2012,
      motorisation: {
        _id: '67d5aebafcc1f5ed54a9e08b',
        nom: 'Essence',
      },
      immatriculation: '2901TAA',
    },
    description: 'Tsy mandeha frein. Nefa vao avy nosoloina vao haingana',
    kilometrage: 520,
    status: 5,
    dateDemande: '2025-03-16T14:03:32.410Z',
    utilisateur: {
      id: '67d6c7d3c34d5a3c68c2f570',
      nom: 'Rakoto',
      prenom: 'Hervé',
    },
  },
  {
    _id: '67d6e271fa1ed23c7c1815e5',
    vehicule: {
      _id: '67d672dd52f6296c789cacca',
      marque: {
        _id: '67d5c016fcc1f5ed54a9e096',
        nom: 'BMW',
      },
      modele: 'M3 competition',
      annee: 2012,
      motorisation: {
        _id: '67d5aebafcc1f5ed54a9e08b',
        nom: 'Essence',
      },
      immatriculation: '2901TAA',
    },
    description: 'Soloina pneu',
    kilometrage: 520,
    status: 0,
    dateDemande: '2025-03-16T14:38:41.352Z',
    utilisateur: {
      id: '67d6c7d3c34d5a3c68c2f570',
      nom: 'Rakoto',
      prenom: 'Hervé',
    },
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
