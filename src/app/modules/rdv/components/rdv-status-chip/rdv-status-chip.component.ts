import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { RDV_CHIP } from '../../constants/rdv-chip.constant';

@Component({
  selector: 'app-rdv-status-chip',
  imports: [TagModule],
  templateUrl: './rdv-status-chip.component.html',
  styleUrl: './rdv-status-chip.component.scss',
})
export class RdvStatusChipComponent {
  @Input() rdvStatus: number = 0;
  rdvStatusEnum = RDV_CHIP;

  get colorClass(): string {
    return this.rdvStatusEnum[this.rdvStatus].colorClass;
  }

  get label(): string {
    return this.rdvStatusEnum[this.rdvStatus].label;
  }
}
