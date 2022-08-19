
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SplashBoardComponent } from './splash-board/splash-board.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [

  { path: 'splash',
   component: PagesComponent, children: [
    
    { path: '', component: SplashBoardComponent },
    { path: 'progress', component: ProgressComponent },
    { path: 'grafica-uno', component: GraficaUnoComponent },
    { path: 'account-settings', component: AccountSettingsComponent },
  
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
