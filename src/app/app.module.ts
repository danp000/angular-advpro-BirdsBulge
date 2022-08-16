import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './404/not-found/not-found.component';
import { LogModule } from './log/log.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    LogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
