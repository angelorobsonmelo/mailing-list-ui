import { RouterModule } from '@angular/router';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { SnacBarSuccessComponent } from './snac-bar-success/snac-bar-success.component';


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
    FormsModule
  ],
  declarations: [PaginaNaoEncontradaComponent, NaoAutorizadoComponent],
  providers: [
    Title,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
