import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize, map, Observable, of } from 'rxjs';
import { DemandeDevis } from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';
import { Service } from '../../../../shared/types/Services';
import { handleResponse } from '../../../../shared/utils/form.utils';
import { CreationDevisFormComponent } from '../../components/creation-devis-form/creation-devis-form.component';
import { DevisService } from '../../services/devis.service';
import { DevisCreationType } from '../../types/DevisCreationType';

@Component({
  selector: 'app-creation-devis-form-root',
  imports: [CreationDevisFormComponent, CommonModule, ToastModule],
  providers: [DevisService, MessageService],
  templateUrl: './creation-devis-form-root.component.html',
  styleUrl: './creation-devis-form-root.component.scss',
})
export class CreationDevisFormRootComponent implements OnInit {
  constructor(
    private devisService: DevisService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  services$!: Observable<Service[]>;
  marques$!: Observable<Marque[]>;
  motorisations$!: Observable<Motorisation[]>;
  demandeDevis$!: Observable<DemandeDevis | null>;
  loading = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      const idDemande = params['from'];
      if (idDemande) {
        console.log('Valeur de idDemande:', idDemande);
        this.loading = true;
        this.demandeDevis$ = this.devisService
          .findDemandeDevisById(idDemande)
          .pipe(
            map((res) => {
              this.marques$ = of([res.data.vehicule.marque as Marque]);
              this.motorisations$ = of([
                res.data.vehicule.motorisation as Motorisation,
              ]);
              console.log('tonga demande devis');

              return res.data;
            }),
            catchError((err) => {
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
      } else {
        this.demandeDevis$ = of(null);
        this.marques$ = this.devisService.findAllMarque();
        this.motorisations$ = this.devisService.findAllMotorisation();
      }
    });
    this.services$ = this.devisService
      .findAllServices()
      .pipe(map((res) => res.data));
  }

  handleSubmit(data: DevisCreationType) {
    this.loading = true;
    this.devisService
      .createDevis(data)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      )
      .subscribe((value: any) => {
        handleResponse(value, this.messageService);
      });
  }
}
