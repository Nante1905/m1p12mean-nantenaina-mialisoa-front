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
import { DevisDataResponse } from '../types/Devis';
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

  filterToHttpParams(filter: object = {}): HttpParams {
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

  findAllDevis(filter: any = {}) {
    return this.http.get<ApiResponse<DevisDataResponse>>('/devis', {
      params: filter ? this.filterToHttpParams(filter) : {},
    });
  }

  findAllServices() {
    return this.http.get<ApiResponse<Service[]>>('/services');
  }

  createDevis(data: DevisCreationType) {
    return this.http.post<ApiResponse<any>>('/devis', data);
  }

  findDevisById(id: string) {
    return this.http.get<ApiResponse<Devis>>(`/devis/${id}`);
  }
}
