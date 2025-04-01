import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../modules/auth/services/auth.service';
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
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonModule],
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
      label: 'Accueil',
      icon: 'home',
      route: 'home',
    },
    {
      label: 'Devis',
      icon: 'request_quote',
      route: 'devis',
    },
    {
      label: 'Creer Devis',
      icon: 'request_quote',
      route: 'creation-devis',
    },
    {
      label: 'Rendez-vous',
      icon: 'schedule',
      route: 'rdv',
    },
    {
      label: 'Les interventions',
      icon: 'schedule',
      route: 'interventions',
    },
    {
      label: 'Factures',
      icon: 'payments',
      route: 'mes_factures',
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
