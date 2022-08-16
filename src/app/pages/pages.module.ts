import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { SplashBoardComponent } from './splash-board/splash-board.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    SplashBoardComponent,
    ProgressComponent,
    GraficaUnoComponent,
    PagesComponent,
  ],
  exports: [
    SplashBoardComponent,
    ProgressComponent,
    GraficaUnoComponent,
    PagesComponent,
  ],
  imports: [ CommonModule, SharedModule, RouterModule ],
})
export class PagesModule {}
