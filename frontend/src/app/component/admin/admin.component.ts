import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../users/services/user.service';
import { User } from '../users/models/user';
import { Observable, filter, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  users$: Observable<User[]>;
  user$: Observable<User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private auth: AuthService) {}
  
  ngOnInit() {
    this.users$ = this.userService.users$;

    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user!.uid))
    );
  }

  logout() {
    this.auth.logout();
  }

}
