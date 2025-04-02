import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../../shared/types/ApiResponse';
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

  getRecettesData() {
    return this.http.get<ApiResponse<RecettesDashboardResponse>>(
      '/dashboard/recettes'
    );
  }

  getNbrInterventionStat() {
    return this.http.get<ApiResponse<NbrInterventionStat>>(
      '/dashboard/intervention-stat'
    );
  }

  getTopServices() {
    return this.http.get<ApiResponse<TopServiceDTO[]>>(
      '/dashboard/service-stat'
    );
  }

  getTopClient() {
    return this.http.get<ApiResponse<TopClientDTO[]>>('/dashboard/client-stat');
  }

  getNbrInterventionOfMec() {
    return this.http.get<ApiResponse<NbrInterventionMecDTO>>(
      '/dashboard/intervention-mec-stat'
    );
  }

  getWorkedHoursOfMec() {
    return this.http.get<ApiResponse<WorkedHour>>('/dashboard/heure-mec-stat');
  }

  getTaskResume() {
    return this.http.get<ApiResponse<TaskResumeDTO[]>>('/dashboard/task-stat');
  }
}
