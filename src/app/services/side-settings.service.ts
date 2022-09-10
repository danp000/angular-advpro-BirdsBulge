import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  menu: any[] = [
    {
      title: '-*- Dashboard -*-',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Progress Bar', url: 'progress' },
        { title: 'Grafica Uno', url: 'grafica-uno' },
        { title: 'Promesas', url: 'promesas' },
        { title: 'Rxjs', url: 'rxjs' },
      ],
    },
    {
      title: 'Mantenimientos',
      icon: 'mdi mdi-folder-account',
      submenu: [
        { title: 'Usuarios', url: 'usuarios' },
        { title: 'Hospitales', url: 'hospitales' },
        { title: 'Médicos', url: 'medicos' },
      ],
    },
  ];

  constructor() {}
}
