import { NgModule, Component }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user/user-list/user-list.component'
import { RegisterComponent } from './user/register/register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginComponent } from './user/user-login/user-login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'UniLodge - Home' } },
  { path: 'login', component: UserLoginComponent, data: { title: 'UniLodge - User Login' } },
  { path: 'users', component: UserListComponent, data: { title: 'UniLodge - Users'} },
  { path: 'users/update/:Username', component: UserEditComponent, data: { title: 'UniLodge - Update User' } },
  { path: 'register', component: RegisterComponent, data: { title: 'UniLodge - Register User' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'UniLodge - Profile' } },
  { path: '404', component: PageNotFoundComponent, data: { title: 'UniLodge - 404 Not Found' } },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}