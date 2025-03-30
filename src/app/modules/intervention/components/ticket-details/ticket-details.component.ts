import { CommonModule } from '@angular/common';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SkeletonModule } from 'primeng/skeleton';
import { TextareaModule } from 'primeng/textarea';
import { catchError, finalize, map, Observable, of, tap } from 'rxjs';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import { getUserFullname } from '../../../../shared/helpers/user';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { Comment, Tache } from '../../../../shared/types/Intervention';
import { Utilisateur } from '../../../../shared/types/Utilisateur';
import { InterventionService } from '../../services/intervention.service';

@Component({
  selector: 'app-ticket-details',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SkeletonModule,
    TextareaModule,
  ],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.scss',
})
export class TicketDetailsComponent implements OnInit {
  constructor(
    private interventionService: InterventionService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}
  private _tache!: Tache;

  immatriculation = input<string | undefined>(undefined);

  newComment: string = '';

  comments$: Observable<Comment[]> = of([]);
  loadingComments: boolean = false;
  commentsLength = 0;
  sendingComment = false;
  formatDate = formatDateToReadable;

  currentUser!: Utilisateur;

  ngOnInit(): void {
    this.comments$ = this.getAllComments();
    this.currentUser = this.authService.getCurrentUser() as Utilisateur;
  }

  @Input()
  get tache(): Tache {
    return this._tache;
  }
  set tache(t: Tache) {
    this._tache = t;
    this.comments$ = this.getAllComments();
  }

  getAllComments() {
    this.loadingComments = true;
    return this.interventionService.findAllCommentsOfTache(this.tache._id).pipe(
      map((res) => {
        this.commentsLength = res.data.length;
        return res.data;
      }),
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
    return this.tache.responsables.map((r) => getUserFullname(r)).join(', ');
  }

  addNewComment() {
    this.sendingComment = true;
    this.interventionService
      .addComment(this.tache._id, this.newComment)
      .pipe(
        tap((res) => {
          this.newComment = '';
          this.messageService.add({
            severity: 'success',
            detail: res.message,
            summary: 'Succès',
          });
          this.comments$ = this.getAllComments();
        }),
        catchError((error) => {
          console.log(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: error.error.message,
          });
          return of();
        }),
        finalize(() => {
          this.sendingComment = false;
        })
      )
      .subscribe();
  }
}
