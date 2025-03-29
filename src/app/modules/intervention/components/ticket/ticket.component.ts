import { Component, input, OnInit, output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from 'primeng/autocomplete';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';
import { ConfirmationModalComponent } from '../../../../shared/components/confirmation-modal/confirmation-modal.component';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import {
  getUserCompleteInitial,
  getUserFullname,
} from '../../../../shared/helpers/user';
import { RoleType } from '../../../../shared/types/Auth';
import { ActionTache, Tache } from '../../../../shared/types/Intervention';
import { Utilisateur } from '../../../../shared/types/Utilisateur';
import {
  AssignRespEventProps,
  UpdateStatusEventProps,
} from '../../types/intervention.type';

@Component({
  selector: 'app-ticket',
  imports: [
    Avatar,
    AvatarGroup,
    Tooltip,
    PopoverModule,
    ButtonModule,
    AutoComplete,
    FormsModule,
    HasRoleDirective,
    ConfirmationModalComponent,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent implements OnInit {
  ROLES = RoleType;
  @ViewChild('popover') popover!: Popover;
  @ViewChild('userPopover') userPopover!: Popover;

  responsables!: Utilisateur[];
  suggestions: Utilisateur[] = [];

  task = input.required<Tache>();
  users = input.required<Utilisateur[]>();

  getInitial = getUserCompleteInitial;
  getFullname = getUserFullname;
  permittedActions: ActionTache[] = [];

  onClick = output<Tache>();
  updateStatus = output<UpdateStatusEventProps>();
  deleteTache = output<Tache>();
  assignResponsables = output<AssignRespEventProps>();

  showConfirmationModal = false;
  activateAssignBtn = false;

  ngOnInit(): void {
    this.responsables = this.task().responsables as Utilisateur[];
    this.permittedActions = Object.values(this.task().actionPermis || {});
  }

  togglePopOver(event: any) {
    this.popover.toggle(event);
  }

  toggleUserPopover(event: any) {
    this.userPopover.toggle(event);
  }

  autoComplete(event: AutoCompleteCompleteEvent) {
    const queryParts = event.query
      .split(/\s+/)
      .filter((part) => part.trim() !== '');
    const searchRegex = new RegExp(
      queryParts.map((part) => `(?=.*${part})`).join(''),
      'i'
    );

    this.suggestions = [...this.users()].filter(
      (u) =>
        searchRegex.test(`${u.nom} ${u.prenom}`) &&
        this.responsables.filter((r) => r._id == u._id).length == 0
    );
  }

  hasResponsableChanged() {
    const previousId = [...this.task().responsables.map((r) => r._id)].sort();
    const currentId = [...this.responsables.map((r) => r._id)].sort();

    if (previousId.length != currentId.length) return true;
    return !previousId.every((id, index) => id === currentId[index]);
  }

  handleSelectResponsable(event: AutoCompleteSelectEvent) {
    this.activateAssignBtn = this.hasResponsableChanged();
  }

  handleAssignResponsable() {
    this.assignResponsables.emit({
      task: this.task(),
      responsables: this.responsables,
    });
    this.userPopover.toggle({});
  }

  updateTaskStatus(targetStatus: number) {
    this.updateStatus.emit({ task: this.task(), target: targetStatus });
    this.popover.toggle({ target: this.popover });
  }

  showDeleteConfirmation() {
    this.popover.toggle({ target: this.popover });
    this.showConfirmationModal = true;
  }

  handleDeleteTask() {
    this.showConfirmationModal = false;
    this.deleteTache.emit(this.task());
  }

  handleCancelDelete() {
    this.showConfirmationModal = false;
  }

  click() {
    this.onClick.emit(this.task());
  }
}
