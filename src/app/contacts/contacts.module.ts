import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { ContactsService } from './contacts.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from '../auth/TokenInterceptor';
import { HttpClient } from '@angular/common/http';
import { FunctionService } from '../functions/function.service';
import { CategoryService } from '../categories/categories.service';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ContactsRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [ContactsComponent],
  providers: [
    ContactsService,
    FunctionService,
    CategoryService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
})
export class ContactsModule { }
