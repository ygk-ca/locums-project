import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserDashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AuthTokenHttpInterceptorProvider } from './http-interceptors/auth-token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import {CalendarModule} from 'src/app/component/dashboard/calendar/calendar.module'; 
import { UserFormComponent } from './component/users/user-form/user-form/user-form.component';
import { AdminComponent } from './component/admin/admin.component';
import { ClinicComponent } from './component/clinic/clinic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    ForgotPasswordComponent,
    UserFormComponent,
    AdminComponent,
    ClinicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    HttpClientModule,
    CalendarModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthTokenHttpInterceptorProvider
  ],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
