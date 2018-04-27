import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { FunctionsComponent } from './functions/functions.component';
import { LoginComponent } from './login/login.component';
import { ToolbarComponent } from './core/layout/toolbar/toolbar.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    FunctionsComponent,
    LoginComponent,
    ToolbarComponent,
    CategoriesComponent,
    CategoriesComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
