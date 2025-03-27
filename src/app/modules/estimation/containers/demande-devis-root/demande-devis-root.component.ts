import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize, map, Observable, tap } from 'rxjs';
import {
  DemandeDevis,
  DemandeDevisForm,
} from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { Motorisation } from '../../../../shared/types/Motorisation';
import { Vehicule } from '../../../../shared/types/Vehicule';
import {
  showToastError,
  showToastSuccess,
} from '../../../../shared/utils/form.utils';
import { DemandeDevisFormComponent } from '../../components/demande-devis-form/demande-devis-form.component';
import { DevisService } from '../../services/devis.service';

@Component({
  selector: 'app-demande-devis-root',
  imports: [DemandeDevisFormComponent, ToastModule, CommonModule],
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
  vehicules$!: Observable<Vehicule[]>;
  loading = false;

  onSubmit(demandeDevis: DemandeDevisForm) {
    const data: Partial<DemandeDevis> = {
      vehiculeId: demandeDevis.vehiculeId,
      vehicule: {
        marque: demandeDevis.marque,
        modele: demandeDevis.modele,
        annee: demandeDevis.annee,
        motorisation: demandeDevis.motorisation,
        immatriculation: demandeDevis.immatriculation,
      },
      kilometrage: demandeDevis.kilometrage,
      description: demandeDevis.description,
      saveVehicule: demandeDevis.saveVehicule,
    };
    this.loading = true;
    this.devisService
      .createDemandeDevis(data as DemandeDevis)
      .pipe(
        tap((res: any) => {
          showToastSuccess(res.message, this.messageService);
          console.log(res);
        }),
        finalize(() => {
          this.loading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          showToastError(error.message, this.messageService);
          return error.message;
        })
      )
      .subscribe();
    // console.log(data);
  }

  ngOnInit(): void {
    this.motorisations$ = this.devisService.findAllMotorisation();
    this.marques$ = this.devisService.findAllMarque();

    const newVehicule: Vehicule = {
      _id: '0',
      marque: '',
      modele: '',
      annee: '',
      motorisation: '',
      immatriculation: 'Nouveau vehicule',
    };
    this.vehicules$ = this.devisService
      .findAllVehicule()
      .pipe(map((v) => [newVehicule, ...v]));
  }
}
