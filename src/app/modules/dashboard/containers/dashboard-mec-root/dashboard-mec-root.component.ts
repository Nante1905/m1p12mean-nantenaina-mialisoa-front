import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { map } from 'rxjs';
import { CardNumberComponent } from '../../components/card-number/card-number.component';
import { DashboardService } from '../../services/dashboard.service';
import { TaskResumeDTO } from '../../types/dashboard.type';

@Component({
  selector: 'app-dashboard-mec-root',
  imports: [CardNumberComponent, TableModule, TagModule],
  templateUrl: './dashboard-mec-root.component.html',
  styleUrl: './dashboard-mec-root.component.scss',
})
export class DashboardMecRootComponent implements OnInit {
  constructor(private dashboardService: DashboardService) {}

  nbrInterventionMec: number = 0;
  workedHoursMec: number = 0;
  taskResume: TaskResumeDTO[] = [];

  ngOnInit(): void {
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
