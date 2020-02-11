import { NgModule, Component }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user/user-list/user-list.component'
import { RegisterComponent } from './user/register/register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './user/profile/profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { ListingComponent } from './listings/listing/listing.component';

const routes: Routes = [
  // General Routes
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'UniLodge - Home' } },
  // User relevant routes
  { path: 'login', component: UserLoginComponent, data: { title: 'UniLodge - User Login' } },
  { path: 'register', component: RegisterComponent, data: { title: 'UniLodge - Register User' } },
  { path: 'profile/:Username', component: ProfileComponent, data: { title: 'UniLodge - Profile' } },
  // These are mainly for testing - user shouldn't see these in production
  { path: 'users', component: UserListComponent, data: { title: 'UniLodge - Users'} },
  { path: 'users/update/:Username', component: UserEditComponent, data: { title: 'UniLodge - Update User' } },
  // Listings relevant routes
  { path: 'listing', component: ListingComponent, data: { title: 'UniLodge - Listing' } },
  // Redirections
  { path: '404', component: PageNotFoundComponent, data: { title: 'UniLodge - 404 Not Found' } },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}