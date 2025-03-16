import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-creation-devis-form',
  imports: [
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './creation-devis-form.component.html',
  styleUrl: './creation-devis-form.component.scss',
})
export class CreationDevisFormComponent implements OnChanges, OnInit {
  products = [
    {
      name: 'Banana',
      price: 1.2,
    },
    {
      name: 'Apple',
      price: 2.3,
    },
    {
      name: 'Orange',
      price: 3.4,
    },
  ];

  productsForm: any[] = [];

  ngOnInit(): void {
    this.productsForm = [...this.products];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
