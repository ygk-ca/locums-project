import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      if (res.user?.emailVerified == true) {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/dashboard']);
      }
      else {
        alert('Please verify your email address. Check your inbox.');
        this.router.navigate(['/login']);
      }

    }, err => {
      alert('Login Failed. Please try again.');
      this.router.navigate(['/login']);
    })
  }

  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Please verify your email address. Check your inbox.');
      this.router.navigate(['/login']);
      this.sendVerificationMail(res.user);
    }, err => {
      alert('Registration Failed');
      this.router.navigate(['/register']);
    })
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
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/login']);
    }, (err:any) => {
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {

    if (localStorage.getItem('token') == 'true') {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
