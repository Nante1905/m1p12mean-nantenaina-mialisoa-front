import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() collapsed: boolean = true;
  @Output() collapsedChange = new EventEmitter<boolean>();

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
    // { label: 'Utilisateurs', icon: 'people', route: 'users' },
    // { label: 'Projets', icon: 'work', route: 'projects' },
    // { label: 'Rapports', icon: 'bar_chart', route: 'reports' },
    // { label: 'Paramètres', icon: 'settings', route: 'settings' },
  ];

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.checkScreenSize();
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
