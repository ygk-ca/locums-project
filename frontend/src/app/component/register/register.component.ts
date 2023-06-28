import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/component/users/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';
  displayName : string = '';

  constructor(private auth : AuthService, private userService : UserService) {}

  ngOnInit(): void {}

  async register() {
    if (this.email == '' || this.password == '' || this.displayName == '') {
      alert('Please fill all the fields');
      return;
    }

    if (this.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    this.auth.register({email: this.email, password: this.password, displayName: this.displayName});
    this.email = '';
    this.password = '';
    this.displayName = '';
  }

}
