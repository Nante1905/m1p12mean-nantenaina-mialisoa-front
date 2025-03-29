import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { catchError, finalize, first, map, Observable, of, tap } from 'rxjs';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { ApiResponse } from '../../../../shared/types/ApiResponse';
import { Devis } from '../../../../shared/types/Devis';
import {
  showToastError,
  showToastSuccess,
} from '../../../../shared/utils/form.utils';
import { DetailsDevisComponent } from '../../components/details-devis/details-devis.component';
import { CREATED_DEVIS_STATUS } from '../../constants/devis';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-details-devis-root',
  imports: [
    DetailsDevisComponent,
    CommonModule,
    LoaderComponent,
    CardModule,
    ButtonModule,
  ],
  templateUrl: './details-devis-root.component.html',
  styleUrl: './details-devis-root.component.scss',
})
export class DetailsDevisRootComponent implements OnInit {
  constructor(
    private devisService: DevisService,
    private messageService: MessageService
  ) {}
  private route = inject(ActivatedRoute);
  id = '';
  devis$!: Observable<Devis | null>;
  CREATED_STATUS = CREATED_DEVIS_STATUS;

  loadingPdf = false;
  loadingRdv = false;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.devis$ = this.devisService.findDevisById(params['id']).pipe(
        map((res) => res.data),
        catchError((err) => {
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error.message,
          });
          return of(null);
        })
      );
    });
  }

  onDownloadPdf = () => {
    this.loadingPdf = true;
    this.devis$.pipe(first()).subscribe((devis) => {
      if (devis && devis._id) {
        this.devisService.downloadDevisPdf(devis._id).subscribe((res) => {
          const url = URL.createObjectURL(res);

          const a = document.createElement('a');
          a.href = url;
          a.download = `DEVIS-${devis._id}.pdf`;
          a.click();

          URL.revokeObjectURL(url);

          this.loadingPdf = false;
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Aucun devis trouvé',
        });
        this.loadingPdf = false;
      }
    });
  };
  handleTakeRdv() {
    this.loadingRdv = true;
    this.devisService
      .takeRdv(this.id)
      .pipe(
        tap((res: ApiResponse<void>) => {
          showToastSuccess('Rendez-vous pris avec succès', this.messageService);
        }),
        finalize(() => {
          this.loadingRdv = false;
        }),
        catchError((err) => {
          showToastError(err.error || err.error.message, this.messageService);
          return [];
        })
      )
      .subscribe();
  }
}
