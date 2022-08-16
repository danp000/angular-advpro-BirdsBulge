import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './log/login/login.component';
import { RegisterComponent } from './log/register/register.component';
import { NotFoundComponent } from './404/not-found/not-found.component';
import { SplashBoardComponent } from './pages/splash-board/splash-board.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { HeadlineComponent } from './shared/headline/headline.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficaUnoComponent } from './pages/grafica-uno/grafica-uno.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    SplashBoardComponent,
    BreadcrumbsComponent,
    SideBarComponent,
    HeadlineComponent,
    ProgressComponent,
    GraficaUnoComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
