import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { HasRoleDirective } from '../../directives/has-role/has-role.directive';
import { RoleType } from '../../types/Auth';
import { Utilisateur } from '../../types/Utilisateur';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
  badge?: {
    text: string;
    variant: 'primary' | 'success' | 'danger' | 'warning';
  };
  auth?: RoleType[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    HasRoleDirective,
  ],
  providers: [Router, AuthService],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() collapsed: boolean = true;
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    this.utililsateur = this.authService.getCurrentUser() as Utilisateur;
  }

  // isMobile: boolean = false;
  activeMenuItem: string | null = null;
  utililsateur!: Utilisateur;

  navItems: NavItem[] = [
    {
      label: 'Tableau de bord',
      icon: 'dashboard',
      route: 'dashboard',
      auth: [RoleType.MANAGER],
    },
    {
      label: 'Devis',
      icon: 'request_quote',
      route: 'devis',
      auth: [RoleType.CLIENT, RoleType.MANAGER],
    },
    {
      label: 'Creer Devis',
      icon: 'request_quote',
      route: 'creation-devis',
      auth: [RoleType.MANAGER],
    },
    {
      label: 'Rendez-vous',
      icon: 'schedule',
      route: 'rdv',
      auth: [RoleType.MANAGER, RoleType.CLIENT],
    },
    {
      label: 'Les interventions',
      icon: 'schedule',
      route: 'interventions',
      auth: [RoleType.MANAGER, RoleType.MECANICIEN, RoleType.CLIENT],
    },
    {
      label: 'Factures',
      icon: 'payments',
      route: 'mes_factures',
      auth: [RoleType.CLIENT, RoleType.MANAGER],
    },
    // schedule
    // { label: 'Utilisateurs', icon: 'people', route: 'users' },
    // { label: 'Projets', icon: 'work', route: 'projects' },
    // { label: 'Rapports', icon: 'bar_chart', route: 'reports' },
    // { label: 'Paramètres', icon: 'settings', route: 'settings' },
  ];

  // @HostListener('window:resize', ['$event'])
  // onResize() {
  //   this.checkScreenSize();
  // }

  // ngOnInit() {
  //   this.checkScreenSize();
  // }

  onclick(e: any) {
    e.preventDefault();
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  logOut() {
    const loggedOut = this.authService.logOut();

    if (loggedOut?.role == RoleType.CLIENT) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/bo/login');
    }
  }
}
