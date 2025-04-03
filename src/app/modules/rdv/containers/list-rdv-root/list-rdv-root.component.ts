import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import dayjs from 'dayjs';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import { RendezVous } from '../../../../shared/types/RendezVous';
import {
  showToastError,
  showToastSuccess,
} from '../../../../shared/utils/form.utils';
import { ListRdvComponent } from '../../components/list-rdv/list-rdv.component';
import { RdvCalendarComponent } from '../../components/rdv-calendar/rdv-calendar.component';
import { RdvService } from '../../service/rdv.service';
import { AcceptRdvEventPayload } from '../../types/AcceptRdvEventPayload';
import { RdvDemandeDto } from '../../types/RdvDemandeDto';

@Component({
  selector: 'app-list-rdv-root',
  imports: [ListRdvComponent, RdvCalendarComponent, CommonModule, ToastModule],
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
  @ViewChild('rdvCalendar') rdvCalendar!: RdvCalendarComponent;

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
    // this.fetchAcceptedRdv(
    //   dayjs().startOf('month').toISOString().toString(),
    //   dayjs().endOf('month').toISOString().toString()
    // );
  }

  handleDateChange({ start, end }: { start: string; end: string }) {
    this.fetchAcceptedRdv(
      dayjs(start).toISOString(),
      dayjs(end).add(23, 'hour').add(59, 'minute').toISOString()
    );
    // console.log('start', start);
    // console.log('end', end);
  }

  handlePageChange(page: number) {
    this.fetchDemandeRdv(page, 50);
  }

  handleAcceptRdv(payload: AcceptRdvEventPayload) {
    const calendarDate = dayjs(
      this.rdvCalendar.calendarComponent.getApi().getDate()
    );
    this.loadingAcceptedRdv = true;

    this.rdvService
      .acceptRdv(payload.id, payload.date)
      .pipe(
        tap((res: any) => {
          showToastSuccess(
            `Rendez-vous (${res.data._id}) accepté avec succès`,
            this.messageService
          );
        }),
        catchError((err) => {
          showToastError(err.error.message, this.messageService);
          return [];
        }),
        finalize(() => {
          this.loadingAcceptedRdv = false;
        })
      )
      .subscribe((res) => {
        if (!res.error) {
          this.fetchAcceptedRdv(
            calendarDate.startOf('month').toISOString().toString(),
            calendarDate.endOf('month').toISOString().toString()
          );
          this.fetchDemandeRdv(1, 50);
        }
      });
  }
}
