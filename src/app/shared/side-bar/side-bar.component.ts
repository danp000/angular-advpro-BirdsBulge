import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styles: [
    `
      .img-circle {
        width: 55px;
        border-radius: 6px;
      }
    `,
  ],
})
export class SideBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
