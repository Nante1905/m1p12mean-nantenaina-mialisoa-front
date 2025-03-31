import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { RendezVous } from '../../../shared/types/RendezVous';
import { RdvDemandeDto } from '../types/RdvDemandeDto';

@Injectable({
  providedIn: 'root',
})
export class RdvService {
  constructor(private http: HttpClient) {}

  findAllDemandeRdv(page: number = 1, limit: number = 50) {
    return this.http.get<ApiResponse<RdvDemandeDto>>(
      `/rdv/demandes?page=${page}&limit=${limit}`
    );
  }
  findAllAcceptedRdv(startDate: string, endDate: string) {
    return this.http.get<ApiResponse<RendezVous[]>>(
      `/rdv/accepted?startDate=${startDate}&endDate=${endDate}`
    );
  }

  acceptRdv(id: string, date: Date | string) {
    return this.http.post<ApiResponse<RendezVous>>(`/rdv/${id}/accept`, {
      date,
    });
  }

  planifyRdv(date: string, idDevis: string) {
    return this.http.post<ApiResponse<any>>(`/rdv/planify`, {
      idDevis,
      date,
    });
  }
}
