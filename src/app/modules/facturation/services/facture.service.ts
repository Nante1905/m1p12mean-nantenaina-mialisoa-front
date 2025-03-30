import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { Facture } from '../../../shared/types/Facture';
import { Paginated } from '../../../shared/types/Paginated';

@Injectable({
  providedIn: 'root',
})
export class FactureService {
  constructor(private http: HttpClient) {}

  createFacture(facture: Facture) {
    return this.http.post<ApiResponse<Facture>>('/factures', facture);
  }

  getFactures(page: number = 1, limit: number = 10) {
    return this.http.get<ApiResponse<Paginated<Facture>>>(
      `/factures?page=${page}&limit=${limit}`
    );
  }

  downloadFacturePDF(factureId: string): Observable<Blob> {
    const headers = new HttpHeaders({
      Accept: 'application/pdf',
    });

    return this.http.get(`/factures/${factureId}/pdf`, {
      headers: headers,
      responseType: 'blob', // Important pour recevoir un blob en réponse
    });
  }
}
