import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { catchError, finalize, map, Observable, of } from 'rxjs';
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
    private messageService: MessageService
  ) {}

  services$!: Observable<Service[]>;
  marques$!: Observable<Marque[]>;
  motorisations$!: Observable<Motorisation[]>;
  loading = false;

  ngOnInit(): void {
    this.services$ = this.devisService
      .findAllServices()
      .pipe(map((res) => res.items));
    this.marques$ = this.devisService.findAllMarque();
    this.motorisations$ = this.devisService.findAllMotorisation();
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
