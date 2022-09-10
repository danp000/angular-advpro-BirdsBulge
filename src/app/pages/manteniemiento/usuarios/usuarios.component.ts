import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService, ModalService, UsuarioService } from 'src/app/services';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
    `
    .me-md-2 {
      margin-right: 20px;
    }
    .me-mr-3 {
      margin-right: 30px
    }
    .fin-lista {
      width: 100%;
      height: 30px;
      font-size: 16px;
      background-color:rgba(196, 252, 244, 0.575);
    }
    .w100 {
      width: 60px;
    }
    .w101 {
      width: 130px;
    }
    .w102 {
      width: 50px;
      margin-bottom: 0;
      margin-top: 0;
      border-radius: 10%;
    }
    .m-r-10 {
      margin-left: 10px;
    }
    td {
      line-height: 50px;
    }
    .loading-message {
      background-color:rgba(196, 252, 244, 0.575);
    }
    .inp-bus {
      margin-bottom: -15px;
    }
    .btn:disabled {
      cursor: not-allowed;
    }
    `
  ]
})
export class UsuariosComponent implements OnInit {

  public userId!: string;
  public accionRole: boolean = false;
  public totalUsuarios: number = 0;
  public usuarios!: Usuario[];
  public usuario!: Usuario;
  public desde: number = 5;
  public desdeAnterior = 0;
  public buscando = false;
  public cargando: boolean = true;
  public alertFin: boolean = false;

  public usuariosMapa = {
    '=0': 'No se encontró ningun usuario con este término',
    '=1': 'usuario encontrado',
    other: 'usuarios encontrados',
  };

  constructor( private usuServ: UsuarioService,
               private busServ: BusquedasService,
               public modServ: ModalService,
               private router: Router ) { 
                  this.usuario = usuServ.usuario;
                }

  ngOnInit(): void {
    this.cargarUsuarios(this.desde);
  }

  abrirModal( us: Usuario ) {
    if (this.usuario.uid === us.uid) {
      this.router.navigateByUrl('splash/perfil');
      return;
    }
    this.modServ.abrirModal( 'usuarios', us );
  }

  swichActions( us: Usuario ) {
    if (this.usuario.uid === us.uid) {
      this.router.navigateByUrl('splash/perfil');
      return;
    }    
    if ( us.uid !== this.userId && !this.accionRole ) {
      this.userId = us.uid!;
      this.accionRole = !this.accionRole;
    } else if ( us.uid === this.userId && this.accionRole ) {
      this.accionRole = !this.accionRole;
      this.userId = '';
    } else if ( us.uid !== this.userId && this.accionRole ) {
      this.userId = us.uid!;
    }
  }
  actualizarRole( usuario: Usuario ) {
    this.usuServ.guardarUsuario( usuario ).subscribe( 
        resp => { console.log(resp); }
     );
  }

  cambiarPagina( valor: number ) {
    this.desde += valor;
    if (this.desde < 0) {
      this.desde = 0;
      return;
    } else if ( this.desde >= this.totalUsuarios ) {
      this.desde -= valor;
      this.alertFin = true;
      return;
    }
    this.cargarUsuarios(this.desde);
  }

  cargarUsuarios( num: number ) {
    this.alertFin = false;
    this.cargando = true;
    if ( this.buscando ) {
      this.alertFin = true;
      return;
    }
    this.usuServ.cargarUsuarios(num).subscribe((
      resp) => {
          this.usuarios = resp.usuarios;
          this.totalUsuarios = resp.total; 
          this.cargando = false;   
         });
    this.desdeAnterior = num;     
  }

  retornaTotalEnPagina() {
    if ( !this.buscando ) {
      return (this.desde <= (this.totalUsuarios - 5))
              ? (this.desde + 5) : this.totalUsuarios
    } else {
      return this.usuarios.length > 0 ? this.totalUsuarios : null;
    }
  }

  buscarUsuario( termino: string ) {
    if ( termino ) {
      // this.cargando = true;
      this.buscando = true;
      this.busServ.buscar('usuarios', termino).subscribe(
        res => { this.usuarios = res!;
                 this.desde = 0;
                 this.totalUsuarios = res!.length;
                //  this.cargando = false;
                   });
    } else {
      this.buscando = false;
      this.cargarUsuarios(this.desdeAnterior);
    }
  }

  borrarUsuario( usuario: Usuario ) {
    if( usuario.uid === this.usuServ.uid ) {
      Swal.fire('¡Operación rechazada!', 'No puede borrar de esta lista al usuario con que estas logueado ahora mismo');
      return;
    }
    Swal.fire({
      titleText: '¿Borrar usuario?',
      text: `Estas seguro que quieres borrar al usuario ${ usuario!.nombre }?`, 
      imageUrl: 'https://img.playbuzz.com/image/upload/ar_1.5,c_pad,f_jpg,b_auto/q_auto:good,f_auto,fl_lossy,w_480,c_limit,dpr_2.5/cdn/15655270-79ee-4dc4-a390-a19701c6caed/f8afb822-f778-4b35-8234-433f15838318_560_420.jpg',
      imageWidth: 200,
      imageHeight: 160,
      width: 430,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuServ.borrarUsuario( usuario ).subscribe( resp => { 
          console.log(resp);
          if (resp.ok) {
            Swal.fire(
              { title: 'Listo',
              text: resp.msg,
              width: 400,
              icon: 'info' }
            );
            this.cargarUsuarios(this.desdeAnterior);
          } else {
            Swal.fire(
              { title: '¡Ups!',
                text: resp.error.msg,
                width: 400,
                icon: 'error' }
            );
          }
        });       
      }
    });
  }


}
