import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetDependencies, GetPackages } from '@/app/api.types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPackages(): Observable<GetPackages> {
    return this.http.get<GetPackages>(`${this.apiUrl}/packages`);
  }

  getDependencies(id: string): Observable<GetDependencies> {
    const safeId = encodeURIComponent(id);
    return this.http.get<GetDependencies>(`${this.apiUrl}/packages/${safeId}/dependencies`);
  }
}
