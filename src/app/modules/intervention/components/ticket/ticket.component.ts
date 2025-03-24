import {
  Component,
  HostListener,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { Avatar } from 'primeng/avatar';
import { AvatarGroup } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { Popover, PopoverModule } from 'primeng/popover';
import { Tooltip } from 'primeng/tooltip';
import { Tache } from '../../../../shared/types/Intervention';
import { Utilisateur } from '../../../../shared/types/Utilisateur';

const users = [
  {
    id: '21350',
    nom: 'Rakoto',
    prenom: 'JEan',
    email: 'jean@test.com',
  },
  {
    id: '213',
    nom: 'Rabe',
    prenom: 'Marc',
    email: 'jean@test.com',
  },
  {
    id: '2150',
    nom: 'Rakoto',
    prenom: 'Kely',
    email: 'jean@test.com',
  },
  {
    id: '210',
    nom: 'Rasoa',
    prenom: 'JEan',
    email: 'jean@test.com',
  },
  {
    id: '20',
    nom: 'RAvao',
    prenom: 'Be',
    email: 'jean@test.com',
  },
];

@Component({
  selector: 'app-ticket',
  imports: [
    Avatar,
    AvatarGroup,
    Tooltip,
    PopoverModule,
    ButtonModule,
    AutoComplete,
    FormsModule,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent implements OnInit {
  @ViewChild('popover') popover!: Popover;
  @ViewChild('userPopover') userPopover!: Popover;

  // mivadika input
  previousResponsables: Partial<Utilisateur>[] = [];

  responsables!: Partial<Utilisateur>[];

  suggestions: Partial<Utilisateur>[] = [];

  onClick = output<Tache>();

  ngOnInit(): void {
    this.responsables = this.previousResponsables;
  }

  togglePopOver(event: any) {
    this.popover.toggle(event);
  }

  toggleUserPopover(event: any) {
    this.userPopover.toggle(event);
  }

  autoComplete(event: AutoCompleteCompleteEvent) {
    const queryParts = event.query
      .split(/\s+/)
      .filter((part) => part.trim() !== '');
    const searchRegex = new RegExp(
      queryParts.map((part) => `(?=.*${part})`).join(''),
      'i'
    );

    this.suggestions = [...users].filter((u) =>
      searchRegex.test(`${u.nom} ${u.prenom}`)
    );
  }

  // TODO: implement
  hasResponsableChanged() {
    return true;
  }

  @HostListener('click')
  click() {
    this.onClick.emit({
      _id: '135453',
      nom: 'Tâche exemple',
      estimation: 2,
      responsable: this.responsables,
    });
  }
}
