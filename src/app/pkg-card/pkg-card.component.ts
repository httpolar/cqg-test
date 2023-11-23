import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumeralService } from '@/app/numeral.service';
import { DownloadIconComponent } from '@/app/download-icon/download-icon.component';

@Component({
  selector: 'app-pkg-card',
  standalone: true,
  imports: [CommonModule, DownloadIconComponent],
  templateUrl: './pkg-card.component.html',
  styleUrl: './pkg-card.component.scss',
})
export class PkgCardComponent {
  private numeral = inject(NumeralService);

  @Input({ required: true }) id: string = '';
  @Input({ required: true }) weeklyDownloads: number = -1;
  @Input({ required: true }) dependencyCount: number = -1;

  get idSplit() {
    return this.id.split('/');
  }

  get group() {
    if (this.idSplit.length <= 1) {
      return null;
    } else {
      return this.idSplit[0];
    }
  }

  get name() {
    if (this.idSplit.length <= 1) {
      return this.idSplit[0];
    } else {
      return this.idSplit[1];
    }
  }

  get humanReadableDownloads(): string {
    return this.numeral.short(this.weeklyDownloads);
  }

  get humanReadableDependencies(): string {
    if (this.dependencyCount == 0) {
      return 'No dependencies';
    } else if (this.dependencyCount == 1) {
      return '1 dependency';
    } else {
      return `${this.dependencyCount} dependencies`;
    }
  }
}
