import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AngularFireAuthGuard} from "@angular/fire/compat/auth-guard";
import {redirectUnauthorizedTo} from "@angular/fire/auth-guard";

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeComponent} from "./home/home.component";

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login'])

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: "full"
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: redirectUnauthorizedToLogin}
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
