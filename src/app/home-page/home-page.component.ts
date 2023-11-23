import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '@/app/api.service';
import { GetPackages, Package, PackageMaybeWithDeps } from '@/app/api.types';
import { PkgCardComponent } from '@/app/pkg-card/pkg-card.component';
import { TextFieldComponent } from '@/app/text-field/text-field.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@/app/button/button.component';
import { XIconComponent } from '@/app/x-icon/x-icon.component';
import { ArrowPathIconComponent } from '@/app/arrow-path-icon/arrow-path-icon.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    PkgCardComponent,
    TextFieldComponent,
    FormsModule,
    ButtonComponent,
    XIconComponent,
    ArrowPathIconComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private apiService: ApiService = inject(ApiService);

  public searchInput = signal<string>('');

  public packages = signal<PackageMaybeWithDeps[]>([]);
  public highlightedItemDependencies: WritableSignal<string[]> = signal([]);
  public filteredPackages = computed(() =>
    this.packages().filter((pkg) =>
      pkg.id.toLowerCase().includes(this.searchInput().toLowerCase()),
    ),
  );


  ngOnInit() {
    this.getPackages();
  }

  getPackages() {
    console.debug('getting packages from the api');
    this.apiService.getPackages().subscribe((data: GetPackages) => {
      this.packages.set(data);
    });
  }

  public resetSearch() {
    this.searchInput.set('');
  }

  public onPackageMouseEnter(targetPkg: PackageMaybeWithDeps) {
    // empty arr - no deps
    // undefiend - not cached
    const maybeDeps = targetPkg.dependencies;
    if (typeof maybeDeps === 'undefined') {
      console.debug('CACHE MISS');
      this.apiService.getDependencies(targetPkg.id).subscribe((data) => {
        this.packages.update((pkgs) => {
          return pkgs.map((pkg) => {
            if (pkg.id === targetPkg.id) {
              return { ...pkg, dependencies: data };
            } else {
              return pkg;
            }
          });
        });
        this.highlightedItemDependencies.set(data);
      });
    } else {
      console.debug('CACHE HIT');
      this.highlightedItemDependencies.set(maybeDeps);
    }
  }

  public onPackageMouseLeave(pkg: PackageMaybeWithDeps) {
    this.highlightedItemDependencies.set([]);
  }
}
