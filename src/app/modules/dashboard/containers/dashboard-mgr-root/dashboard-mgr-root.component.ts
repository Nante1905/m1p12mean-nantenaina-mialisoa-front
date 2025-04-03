import {
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartDataset } from 'chart.js';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { CardNumberComponent } from '../../components/card-number/card-number.component';
import { PeriodeFilter } from '../../constants/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { TopClientDTO, TopServiceDTO } from '../../types/dashboard.type';
import { getAllMonths } from '../../utils/dashboard.utils';

@Component({
  selector: 'app-dashboard-mgr-root',
  imports: [
    CardNumberComponent,
    BarChartComponent,
    TableModule,
    SkeletonModule,
  ],
  templateUrl: './dashboard-mgr-root.component.html',
  styleUrl: './dashboard-mgr-root.component.scss',
})
export class DashboardMgrRootComponent implements OnInit, OnChanges {
  constructor(private dashboardService: DashboardService) {}

  filterDate = input<PeriodeFilter>();

  recettesLabels: string[] = [];
  recettesData: ChartDataset[] = [];
  recettesOfActualMonth: number = 0;
  nbrIntervention: number = 0;
  nbrInterventionByApp: number = 0;
  nbrInterventionByAppPercent: number = 0;

  topServiceData!: TopServiceDTO[];

  topClientData!: TopClientDTO[];

  // loading pour les skeletons
  loadingRecettesData: boolean = true;
  loadingNbrIntervention: boolean = true;
  loadingTopServiceData: boolean = true;
  loadingTopClientData: boolean = true;

  ngOnInit(): void {
    this.recettesLabels = getAllMonths();
    this.initManagerDashboard();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const filter = changes['filterDate'].currentValue;
    if (filter) {
      this.initManagerDashboard(filter);
    }
  }

  initManagerDashboard(range?: PeriodeFilter) {
    this.loadingRecettesData = true;
    this.loadingNbrIntervention = true;
    this.loadingTopServiceData = true;
    this.loadingTopClientData = true;
    this.dashboardService
      .getRecettesData(range)
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
        this.loadingRecettesData = false;
      });

    this.dashboardService
      .getNbrInterventionStat(range)
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.nbrIntervention = res.interventions;
        this.nbrInterventionByAppPercent = res.interventionsByAppPercent;
        this.nbrInterventionByApp = res.interventionsByApp;
        this.loadingNbrIntervention = false;
      });

    this.dashboardService
      .getTopServices(range)
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.topServiceData = res;
        this.loadingTopServiceData = false;
      });

    this.dashboardService
      .getTopClient(range)
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.topClientData = res;
        this.loadingTopClientData = false;
      });
  }
}
