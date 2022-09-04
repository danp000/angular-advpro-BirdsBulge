import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: [
    `
      .card {
        width: 30%;
      }
      a {
        cursor: pointer;
      }
    `,
  ],
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm: FormGroup = this.formBuilder.group({
    email: [ localStorage.getItem( 'email' || '' ), 
          [ Validators.required, Validators.email ] ],
    password: ['', [ Validators.required, Validators.minLength(4) ] ],
    remember: false
  });

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private usuServ: UsuarioService,
               private ngZone: NgZone ) {}

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: "9185816974-4dll97ful1ldtlhktlhve5bbtng840qf.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    // console.log("Encoded JWT ID token: " + response.credential);
    this.usuServ.loginGoogle( response.credential )
        .subscribe({ next: resp => {
          // console.log({ login: resp });
            this.ngZone.run(() =>  {
              this.router.navigateByUrl('/splash');
            });           
            },
            error: er => {
              console.log(er.error);
              Swal.fire({ title:'¡Ups!',
                    icon: 'warning',
                    width: 384,
                    heightAuto: false,
                    text: er.error.msg,
                    timer: 3500
                  }); 
            } 
      });
  }


  registerLink() {
    this.router.navigateByUrl('/regis');
  }

  campoNoValido( campo: string ): boolean {
    if ( this.loginForm.get(campo)?.invalid
         && this.loginForm.get(campo)?.errors && this.loginForm.touched ) {
      return true;
    } 
    return false;
  }

  login() {

    this.usuServ.login( this.loginForm.value )
        .subscribe( { next: (resp) => { 

              if ( this.loginForm.get('remember')?.value ) {
                localStorage.setItem('email', this.loginForm.get('email')?.value);
              } else {
                localStorage.removeItem('email');
              }
               this.router.navigateByUrl('/splash');
         }, 
              error: (er) => {
                console.log(er.error);
                Swal.fire({ title:'Error',
                      icon: 'warning',
                      width: 384,
                      heightAuto: false,
                      timer: 3500,
                      text: er.error.msg ||
                              er.error.errors?.['email']?.msg ||
                              er.error.errors?.['password']?.msg,
                    }); 
              } } );
  }

  
}
