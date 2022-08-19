import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  menu: any[] = [ 
    {
      title: '-*- Dashboard -*-',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main', url: '/'
        },
        {
          title: 'Progress Bar', url: 'progress'
        },
        {
          title: 'Grafica Uno', url: 'grafica-uno'
        }
      ]
    }
   ];

  constructor() { }
}
