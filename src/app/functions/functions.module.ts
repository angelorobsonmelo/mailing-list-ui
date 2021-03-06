import { FunctionService } from './functions.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionsRoutingModule } from './functions-routing.module';
import { FunctionsComponent } from './functions.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from '../auth/TokenInterceptor';
import { HttpClient } from '@angular/common/http';
import { SaveFunctionComponent } from './save-function/save-function.component';
import { RemoveFunctionComponent } from './remove-function/remove-function.component';
import { SnacBarSuccessComponent } from '../core/snac-bar-success/snac-bar-success.component';


@NgModule({
  imports: [
    CommonModule,
    FunctionsRoutingModule,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    FunctionService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: [FunctionsComponent, SaveFunctionComponent, RemoveFunctionComponent, SnacBarSuccessComponent],
  entryComponents: [
    SaveFunctionComponent,
    RemoveFunctionComponent,
    SnacBarSuccessComponent
  ]
})
export class FunctionsModule { }
