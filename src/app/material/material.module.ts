import { MatButtonModule, MatInputModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatToolbarModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
   
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule
  ],
  declarations: [],
  providers: []
})
export class MaterialModule { }
