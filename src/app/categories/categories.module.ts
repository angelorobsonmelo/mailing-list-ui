import { CategoryService } from './categories.service';
import { TokenInterceptor } from './../auth/TokenInterceptor';
import { CategoriesComponent } from './categories.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../material/material.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CategoriesRoutingModule } from './categories-routing.module';
import { SaveCategoryComponent } from './save-category/save-category.component';
import { RemoveCategoryComponent } from './remove-category/remove-category.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    CategoriesRoutingModule
  ],
  declarations: [CategoriesComponent, SaveCategoryComponent, RemoveCategoryComponent],
  providers: [
    CategoryService,
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    SaveCategoryComponent,
    RemoveCategoryComponent
  ]
})
export class CategoriesModule { }
