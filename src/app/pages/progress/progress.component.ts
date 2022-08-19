import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {

  progreso: number = 32;  
  avance: number = 4;

  get getPercent() {
    return `${ this.progreso }%`;
  }
  get getAvance() {
    return `${ this.avance }%`;
  }

}
