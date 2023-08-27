import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserDashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AuthService } from './shared/auth.service';
import { AdminComponent } from './component/admin/admin.component';
import { ClinicComponent } from './component/clinic/clinic.component';
import { LocumComponent } from './component/locum/locum.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'dashboard', component: UserDashboardComponent, canActivate: [AuthService]},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path:'admin', component: AdminComponent, canActivate: [AuthService]},
  {path:'clinic', component: ClinicComponent, canActivate: [AuthService]},
  {path:'locum', component: LocumComponent, canActivate: [AuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
