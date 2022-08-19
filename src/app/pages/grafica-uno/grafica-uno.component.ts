import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica-uno',
  templateUrl: './grafica-uno.component.html',
  styles: [],
})
export class GraficaUnoComponent {
  public tagsC1: string[] = [
    'Policy Data',
    'Claim Data',
  ];
  public tagsC2: string[] = [
    'Vending Orders',
    'Production Orders',
    'Restoration Orders',
    'Rentings',
  ];
  public tagsC3: string[] = [
    'Manufacturing',
    'Refactoring',
    'Aquirings',
  ];
 
  public data: number[] = [];

  public dataC1 = [ 350, 450 ];
  public dataC2 = [ 274, 189, 323, 402 ];
  public dataC3 = [ 392, 568, 245 ];
  public dataC4 = [ 536, 652, 741 ];

  establishData( values: number[] ): number[] {
    return this.data = values;
  }
}
