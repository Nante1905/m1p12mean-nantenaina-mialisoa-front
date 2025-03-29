import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [CommonModule, ProgressSpinner],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() data$!: Observable<any>;
  @Input() loading!: boolean;
}
