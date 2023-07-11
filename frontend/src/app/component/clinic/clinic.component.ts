import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from '../users/services/user.service';
import { User } from '../users/models/user';
import { Observable, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent {

  user$: Observable<User>;

  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user!.uid))
    );
  }

  logout() {
    this.auth.logout()
  }
}
