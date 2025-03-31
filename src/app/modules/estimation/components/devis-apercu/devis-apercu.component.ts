import {
  Component,
  EventEmitter,
  Input,
  input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import dayjs from 'dayjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize, of } from 'rxjs';
import { USER_ROLE } from '../../../../shared/constants/auth';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import {
  getDevisStatusClassname,
  getDevisStatusLabel,
} from '../../../../shared/helpers/devis';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { RoleType } from '../../../../shared/types/Auth';
import { Devis } from '../../../../shared/types/Devis';
import {
  showToastError,
  showToastSuccess,
} from '../../../../shared/utils/form.utils';
import { RdvService } from '../../../rdv/service/rdv.service';
import {
  CREATED_DEVIS_STATUS,
  DELETED_DEVIS_STATUS,
  RDV_DEVIS_STATUS,
  WAITING_RDV_DEVIS_STATUS,
} from '../../constants/devis';
import { RequiredDevisType } from '../../types/Devis';

@Component({
  selector: 'app-devis-apercu',
  imports: [
    TagModule,
    DividerModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    DatePickerModule,
    FormsModule,
    ToastModule,
    HasRoleDirective,
  ],
  providers: [RdvService, MessageService],
  templateUrl: './devis-apercu.component.html',
  styleUrl: './devis-apercu.component.scss',
})
export class DevisApercuComponent implements OnInit, OnChanges {
  CREATED = CREATED_DEVIS_STATUS;
  DELETED = DELETED_DEVIS_STATUS;
  userRoles = RoleType;
  @Output() onTakeRdv: EventEmitter<void> = new EventEmitter<void>();

  @Input() takeRdvLoading = false;
  WAITING_RDV = WAITING_RDV_DEVIS_STATUS;
  RDV_DEVIS_STATUS = RDV_DEVIS_STATUS;

  devis = input.required<Devis, RequiredDevisType>({
    transform: (props: Devis) => ({
      ...props,
      date: formatDateToReadable(dayjs(props.date as string).toDate()),
    }),
  });
  getStatusClassname = getDevisStatusClassname;
  idRdv!: string;
  dateRdv?: string;
  loadingAcceptRdv: boolean = false;
  visible = false;
  errors: string = '';

  handleTakeRdv(): void {
    this.onTakeRdv.emit();
  }
  statusLabel: string = '';
  statusClassname: string = '';
  userRole?: RoleType;
  ROLES = USER_ROLE;

  constructor(
    private authService: AuthService,
    private rdvService: RdvService,
    private messageService: MessageService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.userRole) {
      this.statusLabel = getDevisStatusLabel(this.userRole)[
        this.devis().status
      ];
      this.statusClassname = getDevisStatusClassname(
        this.userRole,
        this.devis().status
      );
    }
    if (
      changes['loadingAcceptRdv'] &&
      changes['loadingAcceptRdv'].currentValue === false &&
      changes['loadingAcceptRdv'].previousValue === true
    ) {
      this.closeDialog();
    }
  }

  ngOnInit(): void {
    const role = this.authService.getCurrentUser()?.role;
    this.userRole = role;
    if (role) {
      this.statusLabel = getDevisStatusLabel(role)[this.devis().status];
      this.statusClassname = getDevisStatusClassname(role, this.devis().status);
    }
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    console.log('close');
    this.dateRdv = undefined;
  }
  handlePlanifyRdv() {
    if (this.dateRdv) {
      if (dayjs(this.dateRdv).isBefore(dayjs())) {
        this.errors =
          'La date du rendez-vous doit être supérieure à la date actuelle';
        return;
      }
    } else if (!this.dateRdv) {
      this.errors = 'La date du rendez-vous est obligatoire';
      return;
    }

    console.log('dateRdv', dayjs(this.dateRdv));
    this.loadingAcceptRdv = true;
    this.rdvService
      .planifyRdv(this.dateRdv, this.devis()._id)
      .pipe(
        catchError((err) => {
          this.loadingAcceptRdv = false;
          this.visible = false;
          showToastError(err.message || err.error.message, this.messageService);
          return of(err);
        }),
        finalize(() => {
          this.loadingAcceptRdv = false;
          this.visible = false;
        })
      )
      .subscribe((res) => {
        showToastSuccess(res.message, this.messageService);
      });
  }
}
