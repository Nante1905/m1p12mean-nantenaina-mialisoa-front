import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { RoleType } from '../../../../shared/types/Auth';
import { showToastError } from '../../../../shared/utils/form.utils';
import { AcceptRdvEventPayload } from '../../types/AcceptRdvEventPayload';
import { RdvDemandeDto } from '../../types/RdvDemandeDto';
import { RdvStatusChipComponent } from '../rdv-status-chip/rdv-status-chip.component';

@Component({
  selector: 'app-list-rdv',
  imports: [
    TableModule,
    CommonModule,
    ChipModule,
    RdvStatusChipComponent,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DatePickerModule,
    FormsModule,
    ToastModule,
    HasRoleDirective,
  ],
  providers: [MessageService],
  templateUrl: './list-rdv.component.html',
  styleUrl: './list-rdv.component.scss',
})
export class ListRdvComponent implements OnChanges {
  constructor(private messageService: MessageService) {}
  ROLES = RoleType;

  expandedRows = {};
  @Input() rdvs!: RdvDemandeDto | null;
  @Input() loadingRdv!: boolean;
  @Input() loadingAcceptRdv!: boolean;
  @Output() onAcceptRdv: EventEmitter<AcceptRdvEventPayload> =
    new EventEmitter();
  visible = false;
  page: number = 1;
  dateRdv?: Date;
  idRdv?: string;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  handlePageChange(event: PaginatorState) {
    this.page = event.page as number;
    this.onPageChange.emit(event.page);
    console.log('event', event);
  }

  showDialog(id: string) {
    this.visible = true;
    this.idRdv = id;
  }

  closeDialog() {
    console.log('close');

    this.visible = false;
    this.dateRdv = undefined;
  }

  handleAcceptRdv() {
    if (this.dateRdv && this.idRdv) {
      if (dayjs(this.dateRdv).isBefore(dayjs())) {
        showToastError(
          'La date du rendez-vous doit être supérieure à la date actuelle',
          this.messageService
        );
        return;
      }
      this.onAcceptRdv.emit({
        id: this.idRdv,
        date: this.dateRdv,
      });
    } else if (!this.dateRdv) {
      showToastError(
        'La date du rendez-vous est obligatoire',
        this.messageService
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['loadingAcceptRdv'] &&
      changes['loadingAcceptRdv'].currentValue === false &&
      changes['loadingAcceptRdv'].previousValue === true
    ) {
      this.closeDialog();
    }
  }
}
