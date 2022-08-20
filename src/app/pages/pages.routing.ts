
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SplashBoardComponent } from './splash-board/splash-board.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';


const routes: Routes = [

  { path: 'splash',
   component: PagesComponent, children: [
    
    { path: '', component: SplashBoardComponent, data: { title: 'Splashboard' } },
    { path: 'progress', component: ProgressComponent, data: {title: 'Progress Bar' } },
    { path: 'grafica-uno', component: GraficaUnoComponent, data: {title: 'Graphics #1' } },
    { path: 'account-settings', component: AccountSettingsComponent, data: {title: 'Adjustments' } },
    { path: 'promesas', component: PromesasComponent, data: {title: 'Promises' } },
    { path: 'rxjs', component: RxjsComponent, data: {title: 'Rxjs' } },
  
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
