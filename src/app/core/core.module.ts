import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

   
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    FormsModule
     ],
  exports: [
    RouterModule,
    HttpModule,
    FormsModule],
  declarations: [],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
