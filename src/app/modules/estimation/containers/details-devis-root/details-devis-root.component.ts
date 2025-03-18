import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Devis } from '../../../../shared/types/Devis';
import { DetailsDevisComponent } from '../../components/details-devis/details-devis.component';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-details-devis-root',
  imports: [DetailsDevisComponent, CommonModule, LoaderComponent],
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
}
