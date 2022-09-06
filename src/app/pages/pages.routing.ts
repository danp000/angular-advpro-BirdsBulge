
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PromesasComponent } from './promesas/promesas.component';
import { SplashBoardComponent } from './splash-board/splash-board.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [

  { path: 'splash',
   component: PagesComponent,
   canActivate: [ AuthGuard ],
   children: [ 
    { path: '', component: SplashBoardComponent, data: { title: 'Splashboard' } },
    { path: 'progress', component: ProgressComponent, data: {title: 'Progress Bar' } },
    { path: 'grafica-uno', component: GraficaUnoComponent, data: {title: 'Graphics #1' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Adjustments' } },
    { path: 'promesas', component: PromesasComponent, data: {title: 'Promises' } },
    { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs' } },
    { path: 'perfil', component: PerfilComponent, data: {title: 'Mi Perfil' } },
  
] },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ] 
})
export class PagesRoutingModule {}
