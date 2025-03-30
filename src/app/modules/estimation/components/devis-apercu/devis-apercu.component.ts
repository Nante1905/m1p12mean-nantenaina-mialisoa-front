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
import dayjs from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { USER_ROLE } from '../../../../shared/constants/auth';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import {
  getDevisStatusClassname,
  getDevisStatusLabel,
} from '../../../../shared/helpers/devis';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { RoleType } from '../../../../shared/types/Auth';
import { Devis } from '../../../../shared/types/Devis';
import {
  CREATED_DEVIS_STATUS,
  DELETED_DEVIS_STATUS,
  WAITING_RDV_DEVIS_STATUS,
} from '../../constants/devis';
import { RequiredDevisType } from '../../types/Devis';

@Component({
  selector: 'app-devis-apercu',
  imports: [TagModule, DividerModule, ButtonModule],
  templateUrl: './devis-apercu.component.html',
  styleUrl: './devis-apercu.component.scss',
})
export class DevisApercuComponent implements OnInit, OnChanges {
  CREATED = CREATED_DEVIS_STATUS;
  DELETED = DELETED_DEVIS_STATUS;
  @Output() onTakeRdv: EventEmitter<void> = new EventEmitter<void>();

  @Input() takeRdvLoading = false;
  WAITING_RDV = WAITING_RDV_DEVIS_STATUS;

  devis = input.required<Devis, RequiredDevisType>({
    transform: (props: Devis) => ({
      ...props,
      date: formatDateToReadable(dayjs(props.date as string).toDate()),
    }),
  });
  getStatusClassname = getDevisStatusClassname;

  handleTakeRdv(): void {
    this.onTakeRdv.emit();
  }
  statusLabel: string = '';
  statusClassname: string = '';
  userRole?: RoleType;
  ROLES = USER_ROLE;

  constructor(private authService: AuthService) {}

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
  }

  ngOnInit(): void {
    const role = this.authService.getCurrentUser()?.role;
    this.userRole = role;
    if (role) {
      this.statusLabel = getDevisStatusLabel(role)[this.devis().status];
      this.statusClassname = getDevisStatusClassname(role, this.devis().status);
    }
  }
}
