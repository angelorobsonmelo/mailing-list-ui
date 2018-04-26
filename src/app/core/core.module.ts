import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';

   
@NgModule({
  imports: [
    CommonModule,
     ],
  exports: [],
  declarations: [],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
