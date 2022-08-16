import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { HeadlineComponent } from './headline/headline.component';



@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SideBarComponent,
    HeadlineComponent,
  ],
  exports: [
    BreadcrumbsComponent,
    SideBarComponent,
    HeadlineComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
