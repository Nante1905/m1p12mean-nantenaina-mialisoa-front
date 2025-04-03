import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize, of, tap } from 'rxjs';
import { InscriptionFormComponent } from '../../components/inscription-form/inscription-form.component';
import { UtilisateurService } from '../../service/utilisateur.service';
import { InscriptionFormDTO } from '../../types/inscription';

@Component({
  selector: 'app-inscription-root',
  imports: [InscriptionFormComponent, ToastModule, CardModule],
  templateUrl: './inscription-root.component.html',
  styleUrl: './inscription-root.component.scss',
})
export class InscriptionRootComponent {
  loading: boolean = false;

  constructor(
    private utilisateurService: UtilisateurService,
    private messageService: MessageService,
    private router: Router
  ) {}

  handleInscription(data: InscriptionFormDTO) {
    this.loading = true;
    this.utilisateurService
      .registerClient(data)
      .pipe(
        tap(() => {
          this.messageService.add({
            summary: 'Succès',
            detail: 'Compte créé',
            severity: 'success',
          });
          this.router.navigateByUrl('/login');
        }),
        catchError((err) => {
          if (Array.isArray(err.error.error)) {
            for (const e of err.error.error) {
              this.messageService.add({
                summary: err.error.message || 'Erreur de validation',
                detail: e,
                severity: 'error',
              });
            }
          } else {
            this.messageService.add({
              summary: err.error.message || 'Erreur de validation',
              detail: err.error.message,
              severity: 'error',
            });
          }
          return of();
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe();
  }
}
