import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filterToHttpParams } from '../../../shared/helpers/filter';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { Intervention } from '../../../shared/types/Intervention';
import { Paginated } from '../../../shared/types/Paginated';
import {
  InterventionDTO,
  InterventionListFilter,
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
}
