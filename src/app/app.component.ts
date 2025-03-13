import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'm1p12mean-nantenaina-mialisoa-front';
  sidebarCollapsed = false;

  toggleSidebar(value: boolean) {
    this.sidebarCollapsed = value;
  }
}
