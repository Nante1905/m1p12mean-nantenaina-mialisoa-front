import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { DemandeDevis } from '../../../shared/types/DemandeDevis';
import { Devis } from '../../../shared/types/Devis';
import { Marque } from '../../../shared/types/Marque';
import { Motorisation } from '../../../shared/types/Motorisation';
import { Service } from '../../../shared/types/Services';
import { Vehicule } from '../../../shared/types/Vehicule';
import {
  DemandeDevisDataResponse,
  DemandeDevisFilter,
} from '../types/DemandeDevis';
import { DevisCreationType } from '../types/DevisCreationType';

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  constructor(private http: HttpClient) {}

  createDemandeDevis(demandeDevis: DemandeDevis) {
    return this.http.post('/devis/demandes', demandeDevis);
  }

  findAllMotorisation() {
    return this.http.get<Motorisation[]>('/motorisations');
  }

  findAllMarque() {
    return this.http.get<Marque[]>('/marques');
  }

  findAllVehicule() {
    return this.http.get<Vehicule[]>('/vehicules');
  }

  filterToHttpParams(filter: DemandeDevisFilter): HttpParams {
    let params = new HttpParams();

    Object.keys(filter).forEach((key) => {
      const value = (filter as any)[key];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value.toString());
      }
    });

    return params;
  }

  findAllDemandeDevis(filter?: DemandeDevisFilter) {
    return this.http.get<{
      isError: boolean;
      message: string;
      data: DemandeDevisDataResponse;
    }>('/devis/demandes', {
      params: filter ? this.filterToHttpParams(filter) : {},
    });
  }

  findAllDevis() {
    const mockDevis: Devis = {
      _id: '67d8384b6520939573383cd7',
      date: '2025-03-16T07:02:50.756+00:00',
      ref: 'DEV452-EFRE',
      client: {
        nom: 'Minohary',
        prenom: 'Nante',
        telephone: '032010101',
        email: 'nantemino15@gmail.com',
      },
      services: [
        {
          _id: '67d812a62790745db95a57dd',
          nom: 'Changement embrayage',
          prix: 0,
        },
      ],
      vehicule: {
        marque: '67d5c016fcc1f5ed54a9e096',
        modele: 'M3 Competition',
        motorisation: '67d5aebafcc1f5ed54a9e08d',
        immatriculation: '1221TAS',
        annee: 2000,
      },
      total: 465000,
      status: 0,
    };
    return [mockDevis, { ...mockDevis, status: 5 }, mockDevis];
  }
  findAllServices() {
    return this.http.get<ApiResponse<Service>>('/services');
  }

  createDevis(data: DevisCreationType) {
    return this.http.post<ApiResponse<any>>('/devis', data);
  }
}
