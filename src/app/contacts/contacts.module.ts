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
import { FunctionService } from '../functions/functions.service';
import { CategoryService } from '../categories/categories.service';
import { SaveContactComponent } from './save-contact/save-contact.component';
import { RemoveContactComponent } from './remove-contact/remove-contact.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ContactsRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [ContactsComponent, SaveContactComponent, RemoveContactComponent],
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
  entryComponents: [
    SaveContactComponent,
    RemoveContactComponent
  ]
})
export class ContactsModule { }
