import {
  Component,
  input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TagModule } from 'primeng/tag';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import {
  getDemandeDevisStatusClassname,
  getDemandeDevisStatusLabel,
} from '../../../../shared/helpers/devis';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { RoleType } from '../../../../shared/types/Auth';
import { DemandeDevis } from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import { DISPO_DEMANDE_DEVIS_STATUS } from '../../constants/devis';
import { RequiredDemandeDevisType } from '../../types/DemandeDevis';

@Component({
  selector: 'app-demande-devis-apercu',
  imports: [TagModule],
  templateUrl: './demande-devis-apercu.component.html',
  styleUrl: './demande-devis-apercu.component.scss',
})
export class DemandeDevisApercuComponent implements OnInit, OnChanges {
  demande = input.required<DemandeDevis, RequiredDemandeDevisType>({
    transform: (props: DemandeDevis) => ({
      ...props,
      dateDemande: formatDateToReadable(new Date(props.dateDemande as string)),
    }),
  });

  ROLES = RoleType;
  DISPO_STATUS = DISPO_DEMANDE_DEVIS_STATUS;
  role?: RoleType;
  statusLabel: string = '';
  statusClassname: string = '';

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.role) {
      this.statusLabel = getDemandeDevisStatusLabel(this.role)[
        this.demande().status as number
      ];
      this.statusClassname = getDemandeDevisStatusClassname(
        this.role,
        this.demande().status as number
      );
    }
  }

  ngOnInit(): void {
    const role = this.authService.getCurrentUser()?.role;
    this.role = role;
    if (role) {
      this.statusLabel =
        getDemandeDevisStatusLabel(role)[this.demande().status as number];
      this.statusClassname = getDemandeDevisStatusClassname(
        role,
        this.demande().status as number
      );
    }
  }

  getMarqueName(): string {
    return typeof this.demande().vehicule.marque === 'string'
      ? (this.demande().vehicule.marque as string)
      : (this.demande().vehicule.marque as Marque).nom;
  }
}
