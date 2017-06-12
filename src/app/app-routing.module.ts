import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { LoginComponent } from './base/components/login/login.component';
import { NotFoundComponent } from './base/components/not-found/not-found.component';
import { HomeComponent } from './base/components/home/home.component';

// import guards
import { AuthenticatedGuard } from './base/guards/authenticated.guard';
import { LoginPageGuard } from './base/guards/login-page.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginPageGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
