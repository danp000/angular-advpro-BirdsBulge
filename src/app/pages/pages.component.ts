import { Component, OnInit } from '@angular/core';

declare function custInitFuncs():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    custInitFuncs();

  }

}
