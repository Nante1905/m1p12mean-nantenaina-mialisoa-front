import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { Tache } from '../../../../shared/types/Intervention';
import { InterventionService } from '../../services/intervention.service';
import {
  InterventionDTO,
  UpdateStatusEventProps,
} from '../../types/intervention.type';
import { TableauTacheComponent } from '../tableau-tache/tableau-tache.component';

@Component({
  selector: 'app-tableau-tache-root',
  imports: [TableauTacheComponent, CommonModule],
  templateUrl: './tableau-tache-root.component.html',
  styleUrl: './tableau-tache-root.component.scss',
})
export class TableauTacheRootComponent implements OnInit {
  constructor(
    private interventionService: InterventionService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  intervention$!: Observable<InterventionDTO | null>;
  loading: boolean = false;
  loadingTaches: boolean = false;
  interventionData: InterventionDTO | null = null;

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const idIntervention = params['id'];
      this.intervention$ = this.interventionService
        .findById(idIntervention)
        .pipe(
          map((res) => {
            this.interventionData = res.data;
            return res.data;
          }),
          catchError((err) => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail: err.error.message,
            });
            return of(null);
          }),
          finalize(() => {
            this.loading = false;
          })
        );
    });
  }

  handleTicketStatusUpdate(event: UpdateStatusEventProps) {
    console.log('root', event);
    this.loadingTaches = true;
    this.interventionService
      .updateTacheStatus(event.task, event.target)
      .pipe(
        map((res) => {
          this.messageService.add({
            severity: 'success',
            detail: res.message,
            summary: 'Succès',
          });
          this.refetchTaches().subscribe();
        }),
        catchError((err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error.message,
          });
          return of();
        }),
        finalize(() => {
          this.loadingTaches = false;
        })
      )
      .subscribe();
  }

  refetchTaches() {
    return this.interventionService
      .findAllTache(this.interventionData?._id as string)
      .pipe(
        map((res) => {
          this.intervention$ = of({
            ...(this.interventionData as InterventionDTO),
            taches: res.data,
          });
        }),
        catchError((err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error.message,
          });
          return of();
        })
      );
  }

  handleDeleteTicket(task: Tache) {
    console.log('root', event);
    this.loadingTaches = true;
    this.interventionService
      .deleteTache(task)
      .pipe(
        map((res) => {
          this.messageService.add({
            severity: 'success',
            detail: res.message,
            summary: 'Succès',
          });
          this.refetchTaches().subscribe();
        }),
        catchError((err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error.message,
          });
          return of();
        }),
        finalize(() => {
          this.loadingTaches = false;
        })
      )
      .subscribe();
  }
}
