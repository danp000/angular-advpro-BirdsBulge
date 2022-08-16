import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  styles: [
    `
      .card {
        width: 30%;
      }
    `,
  ],
})
export class RegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
