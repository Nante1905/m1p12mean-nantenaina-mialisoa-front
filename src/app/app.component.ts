import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'm1p12mean-nantenaina-mialisoa-front';
  sidebarCollapsed = true;

  toggleSidebar(value: boolean) {
    this.sidebarCollapsed = value;
  }
}
