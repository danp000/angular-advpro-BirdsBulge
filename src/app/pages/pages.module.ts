import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GraficaUnoComponent } from './grafica-uno/grafica-uno.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { SplashBoardComponent } from './splash-board/splash-board.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    GraficaUnoComponent,
    PagesComponent,
    ProgressComponent,
    SplashBoardComponent,
  ],
  exports: [
    AccountSettingsComponent,
    GraficaUnoComponent,
    PagesComponent,
    ProgressComponent,
    SplashBoardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule,
    SharedModule,
  ],
})
export class PagesModule {}
