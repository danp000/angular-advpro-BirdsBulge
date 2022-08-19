import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
      .card {
        width: 30%;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  constructor( private router: Router ) {}

  ngOnInit(): void {}

  login() {

    this.router.navigateByUrl('/splash');

  }
}
