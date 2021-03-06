import { AuthService } from './auth/AuthService';
import { AuthGuard } from './auth/AuthGuard';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
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
import { MatCardTitle } from '@angular/material';
import { ContactsComponent } from './contacts/contacts.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/TokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
