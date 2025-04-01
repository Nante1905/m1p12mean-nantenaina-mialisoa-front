import { Component, HostListener, input, OnInit, output } from '@angular/core';
import dayjs from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import {
  getDevisStatusClassname,
  getDevisStatusLabel,
} from '../../../../shared/helpers/devis';
import { Devis } from '../../../../shared/types/Devis';
import { AuthService } from '../../../auth/services/auth.service';
import { RequiredDevisType } from '../../types/Devis';

@Component({
  selector: 'app-devis-item',
  imports: [TagModule, DividerModule, ButtonModule],
  templateUrl: './devis-item.component.html',
  styleUrl: './devis-item.component.scss',
})
export class DevisItemComponent implements OnInit {
  devis = input.required<Devis, RequiredDevisType>({
    transform: (props: Devis) => ({
      ...props,
      date: formatDateToReadable(dayjs(props.date as string).toDate()),
      // statusLabel: DEVIS_STATUS_LABEL[props.status as number],
    }),
  });
  statusLabel: string = '';
  statusClassname: string = '';

  isSelected = input<boolean>(false);
  isHovered = false;

  onSelectDevis = output<Devis>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = this.authService.getCurrentUser()?.role;
    if (role) {
      this.statusLabel = getDevisStatusLabel(role)[this.devis().status];
      this.statusClassname = getDevisStatusClassname(role, this.devis().status);
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  @HostListener('click')
  onClick() {
    this.onSelectDevis.emit(this.devis());
  }
}
