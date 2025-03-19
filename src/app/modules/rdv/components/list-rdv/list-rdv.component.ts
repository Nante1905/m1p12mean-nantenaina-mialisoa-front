import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import { RendezVous } from '../../../../shared/types/RendezVous';
import { RdvStatusChipComponent } from '../rdv-status-chip/rdv-status-chip.component';

@Component({
  selector: 'app-list-rdv',
  imports: [TableModule, CommonModule, ChipModule, RdvStatusChipComponent],
  templateUrl: './list-rdv.component.html',
  styleUrl: './list-rdv.component.scss',
})
export class ListRdvComponent {
  mockrdv = [
    {
      _id: '67da8ad163a388d5d3f357a2',
      status: 0,
      devis: {
        client: {
          nom: 'Rakoto',
          prenom: 'Hervé',
          telephone: '032010101',
          email: 'mialisoamurielle@gmail.com',
          id: '67d6c7d3c34d5a3c68c2f570',
        },
        vehicule: {
          marque: '67d5c016fcc1f5ed54a9e096',
          modele: 'M3 Competition',
          motorisation: '67d5aebafcc1f5ed54a9e08d',
          immatriculation: '1221TAS',
          kilometrage: 120000,
          annee: 2000,
        },
        _id: '67d890c2042d43a5eb40559c',
        services: [
          {
            nom: 'Changement embrayage',
            prix: 800000,
            heures: 3,
            _id: '67d812a62790745db95a57dd',
            total: 2400000,
          },
          {
            nom: 'Équilibrage et parallélisme des roues',
            prix: 200000,
            _id: '67d812a62790745db95a57d9',
            heures: 1,
            total: 200000,
          },
        ],
        numero: '20250317175715',
        date: '2025-03-16T07:02:50.756+00:00',
        status: 5,
        ref: '',
        total: 0,
      },
      dateCreation: '2025-03-19T09:13:53.446Z',
      date: '',
    },
  ];
  rdvs: RendezVous[] = [...this.mockrdv, ...this.mockrdv, ...this.mockrdv];
}
