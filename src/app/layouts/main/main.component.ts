import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-main',
  imports: [SidebarComponent, RouterOutlet, ToastModule, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  title = 'm1p12mean-nantenaina-mialisoa-front';
  sidebarCollapsed = false;

  toggleSidebar(value: boolean) {
    this.sidebarCollapsed = !value;
  }
}
