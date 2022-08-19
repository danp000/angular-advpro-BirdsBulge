import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

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
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
