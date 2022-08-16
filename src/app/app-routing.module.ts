import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';
import { LogRoutingModule } from './log/log.routing';

import { NotFoundComponent } from './404/not-found/not-found.component';

const routes: Routes = [

  // path: '/splash' PagesRouting
  // path: '/login','/regis' LogRouting

  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  
  imports: [ RouterModule.forRoot( routes ),
              PagesRoutingModule,
              LogRoutingModule ],

  exports: [ RouterModule ]
})
export class AppRoutingModule { }
