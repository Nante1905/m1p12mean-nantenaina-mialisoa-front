import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { getTacheStatusClassName } from '../../../../shared/helpers/tache';
import { getUserFullname } from '../../../../shared/helpers/user';
import { DetailsMecanicien } from '../../../../shared/types/Utilisateur';

@Component({
  selector: 'app-mecano-details',
  imports: [CommonModule, DividerModule, TagModule],
  templateUrl: './mecano-details.component.html',
  styleUrl: './mecano-details.component.scss',
})
export class MecanoDetailsComponent {
  mecano = input<DetailsMecanicien>();
  getFullName = getUserFullname;
  getClassName = getTacheStatusClassName;
}
