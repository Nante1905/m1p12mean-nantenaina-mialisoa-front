import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize, Observable } from 'rxjs';
import {
  DemandeDevis,
  DemandeDevisForm,
} from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';
import { DemandeDevisFormComponent } from '../../components/demande-devis-form/demande-devis-form.component';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-demande-devis-root',
  imports: [DemandeDevisFormComponent, ToastModule],
  providers: [DevisService, MessageService],
  templateUrl: './demande-devis-root.component.html',
  styleUrl: './demande-devis-root.component.scss',
})
export class DemandeDevisRootComponent implements OnInit {
  constructor(
    private devisService: DevisService,
    private messageService: MessageService
  ) {}

  motorisations$!: Observable<Motorisation[]>;
  marques$!: Observable<Marque[]>;
  loading = false;

  onSubmit(demandeDevis: DemandeDevisForm) {
    const data: DemandeDevis = {
      vehiculeId: demandeDevis.vehiculeId,
      vehicule: {
        marque: demandeDevis.marque,
        modele: demandeDevis.modele,
        annee: demandeDevis.annee,
        motorisation: demandeDevis.motorisation,
      },
      kilometrage: demandeDevis.kilometrage,
      description: demandeDevis.description,
      saveVehicule: demandeDevis.saveVehicule,
    };
    this.loading = true;
    this.devisService
      .createDemandeDevis(data)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          return error.message;
        })
      )
      .subscribe((value: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: value.message,
        });
        console.log(value);
      });
    // console.log(data);
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: undefined,
    });
  }

  ngOnInit(): void {
    this.motorisations$ = this.devisService.findAllMotorisation();
    this.marques$ = this.devisService.findAllMarque();
  }
}
