import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeDevis } from '../../../shared/types/DemandeDevis';
import { Marque } from '../../../shared/types/Marque';
import { Motorisation } from '../../../shared/types/Motorisation';
import { Vehicule } from '../../../shared/types/Vehicule';
import {
  DemandeDevisDataResponse,
  DemandeDevisFilter,
} from '../types/DemandeDevis';

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
    console.log('fetch demande');

    return this.http.get<{
      isError: boolean;
      message: string;
      data: DemandeDevisDataResponse;
    }>('/devis/demandes', {
      params: filter ? this.filterToHttpParams(filter) : {},
    });
  }
}
