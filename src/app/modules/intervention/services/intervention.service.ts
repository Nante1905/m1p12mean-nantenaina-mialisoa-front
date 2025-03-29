import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filterToHttpParams } from '../../../shared/helpers/filter';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import {
  Comment,
  Intervention,
  Tache,
} from '../../../shared/types/Intervention';
import { Paginated } from '../../../shared/types/Paginated';
import { Utilisateur } from '../../../shared/types/Utilisateur';
import {
  InterventionDTO,
  InterventionListFilter,
  TacheByStatus,
} from '../types/intervention.type';

@Injectable({
  providedIn: 'root',
})
export class InterventionService {
  constructor(private http: HttpClient) {}

  findAllInterventions(filter?: InterventionListFilter) {
    return this.http.get<ApiResponse<Paginated<Intervention>>>(
      `/interventions`,
      {
        params: filter ? filterToHttpParams(filter) : {},
      }
    );
  }

  findById(id: string) {
    return this.http.get<ApiResponse<InterventionDTO>>(`/interventions/${id}`);
  }

  updateTacheStatus(tache: Tache, status: number) {
    return this.http.patch<ApiResponse<any>>(
      `/interventions/taches/${tache._id}`,
      {
        status,
      }
    );
  }

  deleteTache(tache: Tache) {
    return this.http.delete<ApiResponse<any>>(
      `/interventions/taches/${tache._id}`
    );
  }

  findAllTache(idIntervention: string) {
    return this.http.get<ApiResponse<TacheByStatus[]>>(
      `/interventions/${idIntervention}/taches`
    );
  }

  assignToResponsable(idTache: string, utilisateurs: Utilisateur[]) {
    const ids = utilisateurs.map((u) => u._id);
    return this.http.post<ApiResponse<any>>(
      `/interventions/taches/${idTache}/assign`,
      {
        responsables: ids,
      }
    );
  }

  findAllCommentsOfTache(idTache: string) {
    return this.http.get<ApiResponse<Comment[]>>(
      `/interventions/taches/${idTache}/comments`
    );
  }
}
