import { CoreModule } from './../core/core.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatCardTitle, MatCardModule } from '@angular/material';
import { AuthService } from '../auth/AuthService';

@NgModule({
  imports: [
    LoginRoutingModule,
    MaterialModule,
    CoreModule,
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule { }
