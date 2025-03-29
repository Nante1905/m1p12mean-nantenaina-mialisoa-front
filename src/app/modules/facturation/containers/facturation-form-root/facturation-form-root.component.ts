import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Service } from '../../../../shared/types/Services';
import { DevisService } from '../../../estimation/services/devis.service';
import { FacturationFormComponent } from '../../components/facturation-form/facturation-form.component';

@Component({
  selector: 'app-facturation-form-root',
  imports: [FacturationFormComponent, CommonModule],
  providers: [DevisService],
  templateUrl: './facturation-form-root.component.html',
  styleUrl: './facturation-form-root.component.scss',
})
export class FacturationFormRootComponent implements OnInit {
  constructor(private devisService: DevisService) {}

  services$!: Observable<Service[]>;
  ngOnInit(): void {
    this.services$ = this.devisService
      .findAllServices()
      .pipe(map((res) => res.data));
  }
}
