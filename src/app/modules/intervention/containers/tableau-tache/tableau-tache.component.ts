import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { SkeletonModule } from 'primeng/skeleton';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getUserFullname } from '../../../../shared/helpers/user';
import {
  getMarqueName,
  getMotorisationName,
} from '../../../../shared/helpers/vehicule';
import { RoleType } from '../../../../shared/types/Auth';
import { Comment, Tache } from '../../../../shared/types/Intervention';
import { TicketComponent } from '../../components/ticket/ticket.component';
import {
  InterventionDTO,
  RequiredInterventionDTO,
} from '../../types/intervention.type';

@Component({
  selector: 'app-tableau-tache',
  imports: [
    TicketComponent,
    DrawerModule,
    CommonModule,
    DividerModule,
    AccordionModule,
    HasRoleDirective,
    SkeletonModule,
  ],
  templateUrl: './tableau-tache.component.html',
  styleUrl: './tableau-tache.component.scss',
})
export class TableauTacheComponent {
  selectedTache?: Tache;
  showDetailsTache: boolean = false;
  ROLES = RoleType;

  loadingIntervention = input<boolean>(false);
  intervention = input.required<
    InterventionDTO | null,
    RequiredInterventionDTO | null
  >({
    transform: (data: InterventionDTO | null): InterventionDTO | null => {
      if (data) {
        data.date = formatDateToReadable(data.date);
        data.vehicule.marque = getMarqueName(data.vehicule);
        data.vehicule.motorisation = getMotorisationName(data.vehicule);
      }
      return data;
    },
  });

  comments: Comment[] = [];

  selectTache(tache: Tache) {
    this.selectedTache = tache;
    this.showDetailsTache = true;
  }

  getResponsableOfSelectedTache() {
    return this.selectedTache?.responsables
      .map((r) => getUserFullname(r))
      .join(', ');
  }
}
