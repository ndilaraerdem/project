import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './users/register/register.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'address', component: AddressComponent},
  {path: 'cart', component: CartComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'customer', component:CustomerComponent}
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
