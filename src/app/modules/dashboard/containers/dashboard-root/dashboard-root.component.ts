import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { CardModule } from 'primeng/card';
import { DatePicker } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { RoleType } from '../../../../shared/types/Auth';
import { PeriodeFilter } from '../../constants/dashboard';
import { DashboardMecRootComponent } from '../dashboard-mec-root/dashboard-mec-root.component';
import { DashboardMgrRootComponent } from '../dashboard-mgr-root/dashboard-mgr-root.component';

@Component({
  selector: 'app-dashboard-root',
  imports: [
    TableModule,
    HasRoleDirective,
    TagModule,
    DashboardMgrRootComponent,
    DashboardMecRootComponent,
    DatePicker,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
  ],
  templateUrl: './dashboard-root.component.html',
  styleUrl: './dashboard-root.component.scss',
})
export class DashboardRootComponent implements OnInit {
  rangeDates: Date[] | undefined;
  filterDate: PeriodeFilter = {
    start: '01-03-2025',
    end: '30-04-2025',
  };
  t = new Date();

  constructor() {}

  ROLES = RoleType;

  ngOnInit(): void {}

  selectDate(event: any) {
    if (this.rangeDates) {
      const start = this.rangeDates[0];
      const end = this.rangeDates[1];
      if (start && end) {
        this.filterDate = {
          start: dayjs(start).format('DD-MM-YYYY'),
          end: dayjs(end).format('DD-MM-YYYY'),
        };
      }
    }
  }
}
