import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
  imports: [CommonModule, RouterLink, RouterLinkActive],
  providers: [Router],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() collapsed: boolean = true;
  @Output() collapsedChange = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  isMobile: boolean = false;
  activeMenuItem: string | null = null;

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

  ngOnInit() {
    this.checkScreenSize();
  }

  onclick(route: string) {
    this.router.navigate([route]);
  }

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile && !this.collapsed) {
      this.collapsed = true;
      this.collapsedChange.emit(this.collapsed);
    }
  }
}
