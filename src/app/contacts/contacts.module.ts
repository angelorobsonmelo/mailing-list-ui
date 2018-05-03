import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../auth/TokenInterceptor';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ContactsRoutingModule,
    HttpClientModule
  ],
  declarations: [ContactsComponent],
  providers: [
    ContactsService,
    HttpClient,
      {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class ContactsModule { }
