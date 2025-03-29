import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { InterventionService } from '../../services/intervention.service';
import { InterventionDTO } from '../../types/intervention.type';
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

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const idIntervention = params['id'];
      this.intervention$ = this.interventionService
        .findById(idIntervention)
        .pipe(
          map((res) => res.data),
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
}
