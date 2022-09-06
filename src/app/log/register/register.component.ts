import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

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
export class RegisterComponent {

  public formSubmitted: boolean = false;

  public registerForm: FormGroup = this.formBuilder.group({
      nombre:   new FormControl( 'Cambozambo', Validators.compose([
                Validators.required, Validators.minLength(3) ])),
      email:    new FormControl( 'camboz@ambo.iw', Validators.compose([ 
                Validators.required, Validators.email ])),
      password: new FormControl( '12345', Validators.compose([ 
                Validators.required, Validators.minLength(4) ])),
      confirmp: new FormControl( '12345', Validators.compose([ 
                Validators.required, Validators.minLength(4) ])),
      terminos: new FormControl( true, Validators.compose([ 
                Validators.required ])),
  }, {
    validators: this.passwordsIguales('password', 'confirmp')
  });

  constructor( private formBuilder: FormBuilder,
               private usuService: UsuarioService ) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if ( this.registerForm.invalid ) {
      return;
    } 

    // Realizar el posteo
    this.usuService.crearUsuario(this.registerForm.value)
        .subscribe({
          next: (resp) => { console.log('usuario creado');
            console.log(resp);
              Swal.fire({ title:'¡Listo!',
                        icon: 'info',
                        width: 384,
                        heightAuto: false,
                        text: 'Usuario creado correctamente!',
                        timer: 3500
                      }); 
         },
          error: (er) => { 
            Swal.fire({ title:'Error',
                        icon: 'warning',
                        width: 384,
                        heightAuto: false,
                        text: er.error.msg,
                        timer: 3500
                       }); 
             }
        });
  }

  campoNoValido( campo: string ): boolean {

    if ( this.registerForm.get(campo)?.invalid && this.registerForm.get(campo)?.errors && this.formSubmitted ) {
      if ( this.registerForm.get(campo)?.errors!['noIguales'] ) {
        return false;
      }
      return true;
    } 
    return false;
  }

  passwordsNoValidas() {
    const pas = this.registerForm.get('password')?.value;
    const con = this.registerForm.get('confirmp')?.value;

    if ( (pas !== con) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  passwordsIguales( pasName: string, conName: string ) {

    return (control: AbstractControl): ValidationErrors | null => {
      const pass = control.get(pasName)?.value;
      const check = control.get(conName)?.value;

      if (pass !== check) {
        control.get(pasName)?.setErrors({ noIguales: true });
        return { noIguales: true };
      }
      control.get(pasName)?.setErrors(null);
      return null;
    };
    // const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
    //   const pas = control.get('password');
    //   const con = control.get('confirmp');
    //   if( !pas || !con ) return { errors: false };
    //   if( pas === con ) { return { errors: false }  } else {
    //     return { noEsIgual: true }
    //   }
    // }
    // return ( formGroup: FormGroup ) => {
    //   const pasControl = formGroup.get(pasName);
    //   const conControl = formGroup.get(conName);

    //   if ( pasControl?.value === conControl?.value ) {
    //     pasControl?.setErrors(null);
    //     return ({ noEsIgual: false });
    //   } else {
    //     pasControl?.setErrors({ noEsIgual: true });
    //     return ({ noEsIgual: true });
    //   }
    // }
  }

  
}
