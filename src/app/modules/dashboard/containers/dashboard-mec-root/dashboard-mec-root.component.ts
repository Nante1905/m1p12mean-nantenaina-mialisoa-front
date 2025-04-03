import {
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { map } from 'rxjs';
import { CardNumberComponent } from '../../components/card-number/card-number.component';
import { PeriodeFilter } from '../../constants/dashboard';
import { DashboardService } from '../../services/dashboard.service';
import { TaskResumeDTO } from '../../types/dashboard.type';

@Component({
  selector: 'app-dashboard-mec-root',
  imports: [CardNumberComponent, TableModule, TagModule, SkeletonModule],
  templateUrl: './dashboard-mec-root.component.html',
  styleUrl: './dashboard-mec-root.component.scss',
})
export class DashboardMecRootComponent implements OnInit, OnChanges {
  constructor(private dashboardService: DashboardService) {}

  nbrInterventionMec: number = 0;
  workedHoursMec: number = 0;
  taskResume: TaskResumeDTO[] = [];

  loadingNbrInterventionMec: boolean = true;
  loadingWorkedHoursMec: boolean = true;
  loadingTaskResume: boolean = true;

  filterDate = input<PeriodeFilter>();

  ngOnInit(): void {
    this.initDashboardMec();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const filter = changes['filterDate'].currentValue;
    if (filter) {
      this.initDashboardMec(filter);
    }
  }

  getClassName = (status: string) => {
    console.log(status);

    return `tache-${String(status)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')}`;
  };

  initDashboardMec(range?: PeriodeFilter) {
    this.loadingNbrInterventionMec = true;
    this.loadingWorkedHoursMec = true;
    this.loadingTaskResume = true;

    this.dashboardService
      .getNbrInterventionOfMec(range)
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.nbrInterventionMec = res.interventions;
        this.loadingNbrInterventionMec = false;
      });

    this.dashboardService
      .getWorkedHoursOfMec(range)
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.workedHoursMec = res.heures;
        this.loadingWorkedHoursMec = false;
      });
    this.dashboardService
      .getTaskResume(range)
      .pipe(map((res) => res.data))
      .subscribe((res) => {
        this.taskResume = res;
        this.loadingTaskResume = false;
      });
  }
}
