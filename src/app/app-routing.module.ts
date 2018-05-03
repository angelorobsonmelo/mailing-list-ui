import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/AuthGuard";

const routes: Routes = [

  //   {
  //     path:'category',
  //     canActivate: [AuthGuard],
  //     loadChildren: 'app/category/category.module#CategoryModule'
  //   },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'contacts',
    loadChildren: 'app/contacts/contacts.module#ContactsModule'
  },

  { path: '**', redirectTo: '/login' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }