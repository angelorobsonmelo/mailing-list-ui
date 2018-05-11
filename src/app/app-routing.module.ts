import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/AuthGuard";
import { NaoAutorizadoComponent } from "./core/nao-autorizado.component";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";

const routes: Routes = [

  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule'
  },
  {
    path: 'contacts',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    loadChildren: 'app/contacts/contacts.module#ContactsModule'
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    loadChildren: 'app/categories/categories.module#CategoriesModule'
  },
  {
    path: 'functions',
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN'] },
    loadChildren: 'app/functions/functions.module#FunctionsModule'
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'nao-autorizado', component: NaoAutorizadoComponent },
  { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
  { path: '**', redirectTo: 'pagina-nao-encontrada' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }