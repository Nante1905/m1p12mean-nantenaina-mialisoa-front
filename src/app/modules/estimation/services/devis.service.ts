import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DemandeDevis } from '../../../shared/types/DemandeDevis';

@Injectable({
  providedIn: 'root',
})
export class DevisService {
  constructor(private http: HttpClient) {}

  createDemandeDevis(demandeDevis: DemandeDevis) {
    return this.http.post('/devis/demande', demandeDevis);
  }
}
