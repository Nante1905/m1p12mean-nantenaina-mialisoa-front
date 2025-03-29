import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { RoleType } from '../../../../shared/types/Auth';
import { Comment, Tache } from '../../../../shared/types/Intervention';
import { TicketComponent } from '../../components/ticket/ticket.component';
@Component({
  selector: 'app-tableau-tache',
  imports: [
    TicketComponent,
    DrawerModule,
    CommonModule,
    DividerModule,
    AccordionModule,
    HasRoleDirective,
  ],
  templateUrl: './tableau-tache.component.html',
  styleUrl: './tableau-tache.component.scss',
})
export class TableauTacheComponent {
  selectedTache?: Tache;
  showDetailsTache: boolean = false;
  ROLES = RoleType;

  comments: Comment[] = [];

  selectTache(tache: Tache) {
    this.selectedTache = tache;
    this.showDetailsTache = true;
  }
}
