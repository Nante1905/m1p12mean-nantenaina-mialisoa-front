import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-confirmation-modal',
  imports: [DialogModule, ButtonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  visible = input<boolean>(false);
  title = input<string>('Confirmation');
  text = input<string>('Êtes-vous sûr de vouloir continuer ?');
  cancelButtonText = input<string>('Annuler');
  confirmButtonText = input<string>('Confirmer');

  cancel = output<void>();
  confirm = output<void>();

  onCancel() {
    this.cancel.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
