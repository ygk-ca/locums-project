import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleAuthProvider, user } from '@angular/fire/auth';
import { CreateUserRequest, UserService } from 'src/app/component/users/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth,  private userService : UserService, private router : Router) { }

  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user?.emailVerified == true) {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/dashboard']);
      }
      else {
        alert('Please verify your email address. Check your inbox.');
        this.sendVerificationMail(res.user);
        this.router.navigate(['/login']);
      }

    }, err => {
      alert('Login Failed. Please try again.');
      this.router.navigate(['/login']);
    })
  }

  async register(userData : object) {

    let emailExists = await this.checkEmailExists(userData['email']);

    if (emailExists) {
      alert("Email already exists!")
      return;
    }

    const userAccount: CreateUserRequest = {
      displayName: userData['displayName'],
      email: userData['email'],
      password: userData['password'],
      phoneNumber: userData['phoneNumber'],
      role: 'locum'
    }

    this.userService.create(userAccount).subscribe(_ => {});
    alert('Registration Successful! Proceed to login.')
    this.router.navigate(['/login']);

  }

  logout(){
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert('Error in logout');
    }
    )
  }

  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
      alert('Password reset email sent, check your inbox.');
        this.router.navigate(['/login']);
  }, err => {
    alert('Error in sending password reset email');
  })
  }

  sendVerificationMail(user: any) {
    user.sendEmailVerification().then((res: any) => {}, (err:any) => {
      alert('Error in sending verification email');
    }
    )
  }

  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then( res => {

      this.router.navigate(['/dashboard']);
      // JSON.stringify(res.user?.uid)
      localStorage.setItem('token', 'true');

    }, (err:any) => {
      alert('Error in Google Sign In');
    }
    );
  }

  async checkEmailExists(email : string) {
    return this.fireauth.fetchSignInMethodsForEmail(email).then(res => {
      let methods = res;
      if (methods.length == 0) {
        return false;
      }
      else {
        return true
      }
    });
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {

    if (localStorage.getItem('token') == 'true') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
