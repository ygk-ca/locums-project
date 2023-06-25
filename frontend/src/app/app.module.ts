import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { UserDashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AuthTokenHttpInterceptorProvider } from './http-interceptors/auth-token.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    HttpClientModule
  ],
  providers: [
    AuthTokenHttpInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
