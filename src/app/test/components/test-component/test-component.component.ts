import { Component } from '@angular/core';
import { InscriptionFormComponent } from '../../../modules/utilisateurs/components/inscription-form/inscription-form.component';

@Component({
  selector: 'app-test-component',
  imports: [InscriptionFormComponent],
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.scss',
})
export class TestComponentComponent {}
