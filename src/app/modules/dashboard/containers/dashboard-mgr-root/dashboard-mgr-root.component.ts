import { Component, OnInit } from '@angular/core';
import { ChartDataset } from 'chart.js';
import { TableModule } from 'primeng/table';
import { map } from 'rxjs';
import { BarChartComponent } from '../../components/bar-chart/bar-chart.component';
import { CardNumberComponent } from '../../components/card-number/card-number.component';
import { DashboardService } from '../../services/dashboard.service';
import { TopClientDTO, TopServiceDTO } from '../../types/dashboard.type';
import { getAllMonths } from '../../utils/dashboard.utils';

@Component({
  selector: 'app-dashboard-mgr-root',
  imports: [CardNumberComponent, BarChartComponent, TableModule],
  templateUrl: './dashboard-mgr-root.component.html',
  styleUrl: './dashboard-mgr-root.component.scss',
})
export class DashboardMgrRootComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  recettesLabels: string[] = [];
  recettesData: ChartDataset[] = [];
  recettesOfActualMonth: number = 0;
  nbrIntervention: number = 0;
  nbrInterventionByApp: number = 0;

  topServiceData!: TopServiceDTO[];

  topClientData!: TopClientDTO[];

  ngOnInit(): void {
    this.recettesLabels = getAllMonths();
    this.initManagerDashboard();
  }

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
}
