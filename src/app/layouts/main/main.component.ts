import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  imports: [SidebarComponent, RouterOutlet, ToastModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  title = 'm1p12mean-nantenaina-mialisoa-front';
  sidebarCollapsed = true;

  toggleSidebar(value: boolean) {
    this.sidebarCollapsed = value;
  }
}
