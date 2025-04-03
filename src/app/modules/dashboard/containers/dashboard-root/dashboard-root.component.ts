import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { RoleType } from '../../../../shared/types/Auth';
import { AuthService } from '../../../auth/services/auth.service';
import { DashboardService } from '../../services/dashboard.service';
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

  ngOnInit(): void {}
}
