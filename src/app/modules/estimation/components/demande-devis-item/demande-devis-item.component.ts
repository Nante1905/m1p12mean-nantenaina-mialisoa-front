import { Component, HostListener, input, OnInit, output } from '@angular/core';
import dayjs from 'dayjs';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { HasRoleDirective } from '../../../../shared/directives/has-role/has-role.directive';
import { formatDateToReadable } from '../../../../shared/helpers/date';
import {
  getDemandeDevisStatusClassname,
  getDemandeDevisStatusLabel,
} from '../../../../shared/helpers/devis';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { RoleType } from '../../../../shared/types/Auth';
import { DemandeDevis } from '../../../../shared/types/DemandeDevis';
import { Marque } from '../../../../shared/types/Marque';
import {
  CREATED_DEMANDE_DEVIS_STATUS,
  DISPO_DEMANDE_DEVIS_STATUS,
} from '../../constants/devis';
import { RequiredDemandeDevisType } from '../../types/DemandeDevis';

@Component({
  selector: 'app-demande-devis-item',
  imports: [TagModule, DividerModule, HasRoleDirective, ButtonModule],
  templateUrl: './demande-devis-item.component.html',
  styleUrl: './demande-devis-item.component.scss',
})
export class DemandeDevisItemComponent implements OnInit {
  ROLES = RoleType;
  CREATED_STATUS = CREATED_DEMANDE_DEVIS_STATUS;
  DISPO_STATUS = DISPO_DEMANDE_DEVIS_STATUS;

  demande = input.required<DemandeDevis, RequiredDemandeDevisType>({
    transform: (props: DemandeDevis) => ({
      ...props,
      dateDemande: formatDateToReadable(
        dayjs(props.dateDemande as string).toDate()
      ),
      marque: props.vehicule.marque as Marque,
    }),
  });
  isSelected = input<boolean>(false);

  isHovered: boolean = false;
  onSelectDemande = output<DemandeDevis>();

  role?: RoleType;
  statusLabel: string = '';
  statusClassname: string = '';

  constructor(private authService: AuthService) {}

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

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
  }

  @HostListener('click')
  onClick() {
    this.onSelectDemande.emit(this.demande());
  }
}
