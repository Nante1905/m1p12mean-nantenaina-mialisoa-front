import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, ChartDataset, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit, OnDestroy, OnChanges {
  chart!: any;
  @Input() labels: string[] = [];

  @Input() datasets: ChartDataset[] = [];

  ngOnInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datasets'] || changes['labels']) {
      this.destroyChart();
      this.initChart();
    }
  }

  initChart() {
    this.destroyChart();
    this.chart = new Chart('bar-chart', {
      type: 'bar',

      data: {
        labels: this.labels,
        datasets: this.datasets,
      },
      options: {
        aspectRatio: 1,
      },
    });
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}
