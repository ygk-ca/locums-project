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
  userAccount : any;

  constructor(private auth : AuthService, private userService : UserService) {}

  ngOnInit(): void {}

  register() {
    if (this.email == '' || this.password == '' || this.displayName == '') {
      alert('Please fill all the fields');
      return;
    }

    this.userAccount = {
      displayName: this.displayName,
      email: this.email,
      password: this.password,
      role: 'locum'
    }

    this.userService.create(this.userAccount);
    this.email = '';
    this.password = '';
    this.displayName = '';
  }

}
