import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeDevis } from '../../../shared/types/DemandeDevis';
import { Marque } from '../../../shared/types/Marque';
import { Motorisation } from '../../../shared/types/Motorisation';

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
}
