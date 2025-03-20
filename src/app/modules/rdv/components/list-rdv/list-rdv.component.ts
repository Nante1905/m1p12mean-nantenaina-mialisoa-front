import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
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
  ],
  templateUrl: './list-rdv.component.html',
  styleUrl: './list-rdv.component.scss',
})
export class ListRdvComponent {
  expandedRows = {};
  @Input() rdvs!: RdvDemandeDto | null;
  @Input() loadingRdv!: boolean;
  page: number = 1;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  handlePageChange(event: PaginatorState) {
    this.page = event.page as number;
    this.onPageChange.emit(event.page);
    console.log('event', event);
  }
}
