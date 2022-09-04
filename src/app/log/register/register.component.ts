import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    nombre: ['Cambozambo', [ Validators.required, Validators.minLength(3) ] ],
    email: ['camboz@ambo.iw', [ Validators.required, Validators.email ] ],
    password: ['12345', [ Validators.required, Validators.minLength(4) ] ],
    confirmp: ['12345', [ Validators.required, Validators.minLength(4) ] ],
    terminos: [ true, [ Validators.required ] ],
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
      if ( this.registerForm.get(campo)?.errors!['noEsIgual'] ) {
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
    return ( formGroup: FormGroup ) => {
      const pasControl = formGroup.get(pasName);
      const conControl = formGroup.get(conName);

      if ( pasControl?.value === conControl?.value ) {
        pasControl?.setErrors(null);
      } else {
        pasControl?.setErrors({ noEsIgual: true });
      }
    }
  }

  
}
