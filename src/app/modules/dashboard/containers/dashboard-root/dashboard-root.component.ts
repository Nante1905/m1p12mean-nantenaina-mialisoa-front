import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { map } from 'rxjs';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { RoleType } from '../../../../shared/types/Auth';
import { AuthService } from '../../../auth/services/auth.service';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { CardNumberComponent } from '../../components/card-number/card-number.component';
import { DashboardService } from '../../services/dashboard.service';
import {
  TaskResumeDTO,
  TopClientDTO,
  TopServiceDTO,
} from '../../types/dashboard.type';
import { getAllMonths } from '../../utils/dashboard.utils';

@Component({
  selector: 'app-dashboard-root',
  imports: [
    CardNumberComponent,
    CardNumberComponent,
    BarChartComponent,
    TableModule,
    HasRoleDirective,
    TagModule,
  ],
  templateUrl: './dashboard-root.component.html',
  styleUrl: './dashboard-root.component.scss',
})
export class DashboardRootComponent implements OnInit {
  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}

  ROLES = RoleType;

  recettesLabels: string[] = [];
  recettesData: ChartDataset[] = [];
  recettesOfActualMonth: number = 0;
  nbrIntervention: number = 0;
  nbrInterventionByApp: number = 0;

  topServiceData!: TopServiceDTO[];

  topClientData!: TopClientDTO[];

  nbrInterventionMec: number = 0;
  workedHoursMec: number = 0;
  taskResume: TaskResumeDTO[] = [];

  ngOnInit(): void {
    this.recettesLabels = getAllMonths();
    if (this.authService.hasAllRole([RoleType.MANAGER])) {
      this.initManagerDashboard();
    }
    this.initDashboardMec();
  }

  getClassName = (status: string) => {
    console.log(status);

    return `tache-${String(status)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')}`;
  };

  initManagerDashboard() {
    this.dashboardService
      .getRecettesData()
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.recettesOfActualMonth = res.recetteOfActualMonth;
        this.recettesData = [
          {
            label: 'Recettes',
            data: res.monthlyRecette.map((item) => item.total),
            backgroundColor: '#a855f7',
          },
        ];
      });

    this.dashboardService
      .getNbrInterventionStat()
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.nbrIntervention = res.interventions;
        this.nbrInterventionByApp = res.interventionsByAppPercent;
      });

    this.dashboardService
      .getTopServices()
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.topServiceData = res;
      });

    this.dashboardService
      .getTopClient()
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.topClientData = res;
      });
  }

  initDashboardMec() {
    this.dashboardService
      .getNbrInterventionOfMec()
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.nbrInterventionMec = res.interventions;
      });

    this.dashboardService
      .getWorkedHoursOfMec()
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.workedHoursMec = res.heures;
      });
    this.dashboardService
      .getTaskResume()
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.taskResume = res;
      });
  }
}
