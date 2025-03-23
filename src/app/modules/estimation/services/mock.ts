export const mockDemandeDevisResponse = {
  isError: false,
  data: {
    items: [
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
          __v: 0,
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
        __v: 0,
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
          __v: 0,
        },
        description: 'Tsy mandeha frein. Nefa vao avy nosoloina vao haingana',
        kilometrage: 520,
        status: 5,
        dateDemande: '2025-03-16T14:03:32.410Z',
        idDevis: '67d890c2042d43a5eb40559c',
        utilisateur: {
          id: '67d6c7d3c34d5a3c68c2f570',
          nom: 'Rakoto',
          prenom: 'Hervé',
        },
        __v: 0,
      },
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
          __v: 0,
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
        __v: 0,
      },
    ],
    page: 1,
    limit: 10,
    totalItems: 3,
    totalPage: 1,
    stats: [
      {
        value: 0,
        count: 2,
        label: 'Attente',
      },
      {
        value: 5,
        count: 1,
        label: 'Dispo',
      },
      {
        value: 10,
        count: 0,
        label: 'RDV',
      },
    ],
  },
};
