import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/ApiResponse';
import { PeriodeFilter } from '../constants/dashboard';
import {
  NbrInterventionMecDTO,
  NbrInterventionStat,
  RecettesDashboardResponse,
  TaskResumeDTO,
  TopClientDTO,
  TopServiceDTO,
  WorkedHour,
} from '../types/dashboard.type';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getRecettesData(range?: PeriodeFilter) {
    const filter = range ? `?start=${range?.start}&end=${range?.end}` : ``;
    return this.http.get<ApiResponse<RecettesDashboardResponse>>(
      `/dashboard/recettes${filter}`
    );
  }

  getNbrInterventionStat(range?: PeriodeFilter) {
    const filter = range ? `?start=${range?.start}&end=${range?.end}` : ``;

    return this.http.get<ApiResponse<NbrInterventionStat>>(
      `/dashboard/intervention-stat${filter}`
    );
  }

  getTopServices(range?: PeriodeFilter) {
    const filter = range ? `?start=${range?.start}&end=${range?.end}` : ``;
    return this.http.get<ApiResponse<TopServiceDTO[]>>(
      `/dashboard/service-stat${filter}`
    );
  }

  getTopClient(range?: PeriodeFilter) {
    const filter = range ? `?start=${range?.start}&end=${range?.end}` : ``;

    return this.http.get<ApiResponse<TopClientDTO[]>>(
      `/dashboard/client-stat${filter}`
    );
  }

  getNbrInterventionOfMec(range?: PeriodeFilter) {
    const filter = range ? `?start=${range?.start}&end=${range?.end}` : ``;

    return this.http.get<ApiResponse<NbrInterventionMecDTO>>(
      `/dashboard/intervention-mec-stat${filter}`
    );
  }

  getWorkedHoursOfMec(range?: PeriodeFilter) {
    const filter = range ? `?start=${range?.start}&end=${range?.end}` : ``;

    return this.http.get<ApiResponse<WorkedHour>>(
      `/dashboard/heure-mec-stat${filter}`
    );
  }

  getTaskResume(range?: PeriodeFilter) {
    const filter = range ? `?start=${range?.start}&end=${range?.end}` : ``;

    return this.http.get<ApiResponse<TaskResumeDTO[]>>(
      `/dashboard/task-stat${filter}`
    );
  }
}
