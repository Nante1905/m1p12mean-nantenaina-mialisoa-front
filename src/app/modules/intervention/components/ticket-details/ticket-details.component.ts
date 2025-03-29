import { CommonModule } from '@angular/common';
import { Component, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { getUserFullname } from '../../../../shared/helpers/user';
import { Comment, Tache } from '../../../../shared/types/Intervention';
import { InterventionService } from '../../services/intervention.service';

@Component({
  selector: 'app-ticket-details',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule,
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnInit {
  constructor(
    private interventionService: InterventionService,
    private messageService: MessageService
  ) {}

  tache = input.required<Tache>();
  immatriculation = input<string | undefined>(undefined);

  newComment: string = '';

  comments$: Observable<Comment[]> = of([]);
  loadingComments: boolean = false;

  ngOnInit(): void {
    this.comments$ = this.getAllComments();
  }

  getAllComments() {
    this.loadingComments = true;
    return this.interventionService
      .findAllCommentsOfTache(this.tache()._id)
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error.message,
          });
          return of([]);
        }),
        finalize(() => {
          this.loadingComments = false;
        })
      );
  }

  getResponsableOfSelectedTache() {
    return this.tache()
      .responsables.map((r) => getUserFullname(r))
      .join(', ');
  }

  addNewComment() {
    console.log('add comment', { contenu: this.newComment });
    this.newComment = '';
  }
}
