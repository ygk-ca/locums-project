import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  login(){
      if (this.email == '' || this.password == '') {
        alert('Please fill all the fields');
        return;
      }

      this.auth.login(this.email, this.password);
      this.email = '';
      this.password = '';
  }


  signInWithGoogle() {}
}
