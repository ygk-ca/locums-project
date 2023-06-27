import { UserService } from '../users/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../users/models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from 'src/app/component/users/user-form/user-form/user-form.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, filter } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { UserFormService } from 'src/app/component/users/services/user-form.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  users$: Observable<User[]>;
  user$: Observable<User>;

  constructor(
    private userService: UserService,
    private userForm: UserFormService,
    private modal: NgbModal,
    private afAuth: AngularFireAuth,
    private auth: AuthService
  ) { };

  ngOnInit() {
    this.users$ = this.userService.users$;

    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user!.uid))
    );
  }

  create() {
    this.userForm.create();
    const modalRef = this.modal.open(UserFormComponent);
    modalRef.result.then((user: any) => {
      this.userService.create(user).subscribe((_: any) => {
        alert('User Created. Logging you out.');
        this.logout();
      });
    }).catch((err: any) => {
      alert('Error. Please contact Admin. ' + err);
    });
  }

  edit(userToEdit: any) {
    this.userForm.edit(userToEdit);
    const modalRef = this.modal.open(UserFormComponent);
    // once user form pop up is closed, we get the value as a result
    modalRef.result.then((user: any) => {
      this.userService.edit(user).subscribe((_: any) => {
        alert('User Updated. Logging you out.');
        this.logout();
      });
    }).catch(err => {
      if (err != 'modal dismissed') {
        alert('Error. Please contact Admin. ' + err);
      }
    });

  }

  userData(user) {
    var data:string = ``;
    for (var key of Object.keys(user)) {
      data += key + ": " + user[key] + '\n';
    }
    return data;
  }

  logout() {
    this.auth.logout();
  }

}