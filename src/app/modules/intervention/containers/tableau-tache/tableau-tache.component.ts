import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import dayjs from 'dayjs';
import { AccordionModule } from 'primeng/accordion';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { SkeletonModule } from 'primeng/skeleton';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import {
  getMarqueName,
  getMotorisationName,
} from '../../../../shared/helpers/vehicule';
import { RoleType } from '../../../../shared/types/Auth';
import { Comment, Tache } from '../../../../shared/types/Intervention';
import { Utilisateur } from '../../../../shared/types/Utilisateur';
import { TicketDetailsComponent } from '../../components/ticket-details/ticket-details.component';
import { TicketComponent } from '../../components/ticket/ticket.component';
import {
  AssignRespEventProps,
  InterventionDTO,
  RequiredInterventionDTO,
  UpdateStatusEventProps,
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
    LoaderComponent,
    TicketDetailsComponent,
  ],
  templateUrl: './tableau-tache.component.html',
  styleUrl: './tableau-tache.component.scss',
})
export class TableauTacheComponent {
  selectedTache?: Tache;
  showDetailsTache: boolean = false;
  ROLES = RoleType;

  loadingIntervention = input<boolean>(false);
  loadingTache = input<boolean>(false);

  users = input.required<Utilisateur[]>();

  intervention = input.required<
    InterventionDTO | null,
    RequiredInterventionDTO | null
  >({
    transform: (data: InterventionDTO | null): InterventionDTO | null => {
      if (data) {
        data.date = dayjs(new Date(data.date)).format(
          'ddd, DD MMMM YYYY à HH:mm'
        );
        data.vehicule.marque = getMarqueName(data.vehicule);
        data.vehicule.motorisation = getMotorisationName(data.vehicule);
      }
      return data;
    },
  });

  comments: Comment[] = [];

  onUpdateTicketStatus = output<UpdateStatusEventProps>();
  onDeleteTask = output<Tache>();
  assignResponsable = output<AssignRespEventProps>();

  selectTache(tache: Tache) {
    this.selectedTache = tache;
    this.showDetailsTache = true;
  }

  updateTaskStatus(event: UpdateStatusEventProps) {
    this.onUpdateTicketStatus.emit(event);
  }

  deleteTask(event: Tache) {
    this.onDeleteTask.emit(event);
  }
}
