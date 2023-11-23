import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'normal' | 'danger';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './button.component.scss',
  template: `<button (click)="onClick.emit()" [attr.data-variant]="variant"><ng-content></ng-content></button>`,
})
export class ButtonComponent {
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() variant: ButtonVariant = 'normal';
}
