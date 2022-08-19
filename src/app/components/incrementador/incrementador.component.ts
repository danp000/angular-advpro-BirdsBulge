import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input('valor') progreso: number = 0;
  @Input() btnClass: string = 'btn-info';

  @Output() valOutcome: EventEmitter<number> = new EventEmitter();

  addTakeOn(val: number) {
    if (this.progreso >= 100 && val > 0) {
      this.valOutcome.emit(100);
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && val < 0) {
      this.valOutcome.emit(0);
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + val;
    this.valOutcome.emit(this.progreso);
  }

  changeOn( ev: number ) {

    if ( ev > 100 ) {
      this.progreso = 100;
    } else if( ev < 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = ev;
    }

    this.valOutcome.emit( this.progreso );

  }

}
