import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuarioService, ArchiveUploadService } from '../../services';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public perfilForm!: FormGroup;
  public usuario!: Usuario;
  public archivoImg!: File;
  public viewImg!: string | ArrayBuffer;

  constructor( private fb: FormBuilder,
                private usuServ: UsuarioService,
                private uplServ: ArchiveUploadService,
                 ) {
     this.usuario = usuServ.usuario;
    }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, [ Validators.minLength(3) ] ],
      email: [ this.usuario.email, [ Validators.pattern(this.usuServ.patronEmail) ] ],
      password: [ this.usuario.password, [ Validators.minLength(4) ] ],
      role: [ this.usuario.role, [ Validators.minLength(5) ] ]
    });
    if (this.perfilForm.get('role')?.value !== 'ADMIN') {
      this.perfilForm.get('role')?.disable();
    }
      
    if( this.usuario.google ) {
      this.perfilForm.get('password')?.setValue('##..***..##');
      this.perfilForm.get('password')?.disable();
    }
  }

  actualizarPerfil() {

    if ( (this.perfilForm.get('nombre')?.value !== '' 
          || this.perfilForm.get('email')?.value !== ''
          || this.perfilForm.get('password')?.value !== '') 
          && this.perfilForm.valid ) {
      this.usuServ.actualizarPerfil( this.perfilForm.value )
        .subscribe({ next: (resp) => {
          // console.log(resp);
          const { nombre, email } = this.perfilForm.value;
          this.usuario.nombre = nombre;
          this.usuario.email = email;

          Swal.fire('```Guardado```', '^^Los cambios han sido aplicados con éxito^^!', 'success');
        }, error: err => {
          console.log(err);
          Swal.fire({ title:'¡Ups!',
            icon: 'warning',
            width: 394,
            heightAuto: false,
            text: err.error.msg,
            timer: 3500
          }); 
        }});
    }
  }

  cambiarImgPerfil( event: any ) {
    this.archivoImg = event.target.files[0];
      
    if ( !this.archivoImg ) {
      this.viewImg = '';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL( this.archivoImg );
    reader.onloadend = () => {
      this.viewImg = reader.result!;
    }
  }

  subirImagen() {
    this.uplServ.cambiarImgUsuario( this.archivoImg, 'usuarios', 
      (this.usuario.uid!) ).then(
        (img) => { 
        // console.log(img);
        if ( !img.nombreArch && img.ok === false ) {
          Swal.fire({ title:'¡Aviso!',
            icon: 'warning',
            width: 394,
            heightAuto: false,
            text: img.msg,
            timer: 3500
        });
          return;
        }
        this.usuario.img = img;
        Swal.fire('^Guardado^', 'Imagen de perfil cambiada con éxito', 'success');
    }).catch( er => {
        console.log(er);
        Swal.fire('¡Error!', 'Sucedió un error imprevisto, intenta otra imagen..', 'error');
    });
  }
}
