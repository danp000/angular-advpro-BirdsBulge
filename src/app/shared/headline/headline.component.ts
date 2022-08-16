import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styles: [
    `
      .profile-pic {
        width: 55px;
        border-radius: 4px;
      }
      .img-circle {
        width: 50px;
        border-radius: 10px;
      }
    `,
  ],
})
export class HeadlineComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
