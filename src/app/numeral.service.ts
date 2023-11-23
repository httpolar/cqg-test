import { Injectable } from '@angular/core';
import numeral from 'numeral';

@Injectable({
  providedIn: 'root',
})
export class NumeralService {
  constructor() {}

  public short(n: number): string {
    return numeral(n).format('0.[0]a').toUpperCase();
  }
}
