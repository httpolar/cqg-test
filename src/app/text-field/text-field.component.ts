import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './text-field.component.scss',
  template: `<input
    [type]="type"
    [placeholder]="placeholder"
    [value]="value()"
    (input)="onInputChange($event)"
    class="text-field"
  />`,
})
export class TextFieldComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Enter value';
  @Input({ required: true }) value: WritableSignal<string> = signal('');

  onInputChange(event: Event) {
    const field = event.target as HTMLInputElement;
    this.value.set(field.value);
  }
}
