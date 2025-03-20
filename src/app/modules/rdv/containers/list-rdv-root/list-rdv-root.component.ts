import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { MessageService } from 'primeng/api';
import { catchError, finalize, map, Observable } from 'rxjs';
import { RendezVous } from '../../../../shared/types/RendezVous';
import { showToastError } from '../../../../shared/utils/form.utils';
import { ListRdvComponent } from '../../components/list-rdv/list-rdv.component';
import { RdvCalendarComponent } from '../../components/rdv-calendar/rdv-calendar.component';
import { RdvService } from '../../service/rdv.service';
import { RdvDemandeDto } from '../../types/RdvDemandeDto';

@Component({
  selector: 'app-list-rdv-root',
  imports: [ListRdvComponent, RdvCalendarComponent, CommonModule],
  providers: [RdvService, MessageService],
  templateUrl: './list-rdv-root.component.html',
  styleUrl: './list-rdv-root.component.scss',
})
export class ListRdvRootComponent implements OnInit {
  constructor(
    private rdvService: RdvService,
    private messageService: MessageService
  ) {}

  demandeRdv$!: Observable<RdvDemandeDto>;
  acceptedRdv$!: Observable<RendezVous[]>;

  loadingDemandeRdv!: boolean;
  loadingAcceptedRdv!: boolean;

  fetchDemandeRdv(page: number, limit: number) {
    this.loadingDemandeRdv = true;
    this.demandeRdv$ = this.rdvService.findAllDemandeRdv(page, limit).pipe(
      map((res) => res.data),
      catchError((err) => {
        showToastError(err.error.message, this.messageService);
        return [];
      }),
      finalize(() => {
        this.loadingDemandeRdv = false;
      })
    );
  }

  fetchAcceptedRdv(startDate: string, endDate: string) {
    this.loadingAcceptedRdv = true;
    this.acceptedRdv$ = this.rdvService
      .findAllAcceptedRdv(startDate, endDate)
      .pipe(
        map((res) => res.data),
        catchError((err) => {
          showToastError(err.error.message, this.messageService);
          return [];
        }),
        finalize(() => {
          this.loadingAcceptedRdv = false;
        })
      );
  }

  ngOnInit(): void {
    this.fetchDemandeRdv(1, 50);
    this.fetchAcceptedRdv(
      dayjs().startOf('month').toISOString().toString(),
      dayjs().endOf('month').toISOString().toString()
    );
  }

  handleDateChange({ start, end }: { start: string; end: string }) {
    this.fetchAcceptedRdv(start, end);
    // console.log('start', start);
    // console.log('end', end);
  }

  handlePageChange(page: number) {
    this.fetchDemandeRdv(page, 50);
  }
}
