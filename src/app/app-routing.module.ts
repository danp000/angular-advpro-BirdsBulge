import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SplashBoardComponent } from './pages/splash-board/splash-board.component';
import { LoginComponent } from './log/login/login.component';
import { RegisterComponent } from './log/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficaUnoComponent } from './pages/grafica-uno/grafica-uno.component';
import { NotFoundComponent } from './404/not-found/not-found.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  { path: '', component: PagesComponent, children: [
    
      { path: 'splash', component: SplashBoardComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica-uno', component: GraficaUnoComponent },
      { path: '', redirectTo: 'splash', pathMatch: 'full' },
    
  ] },
 

  { path: 'regis', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
