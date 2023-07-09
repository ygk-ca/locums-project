import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../users/services/user.service';
import { User } from '../users/models/user';
import { Observable, filter, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users$: Observable<User[]>;
  user$: Observable<User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private auth: AuthService, private modalService: NgbModal) {}
  
  ngOnInit() {
    this.users$ = this.userService.users$;

    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user!.uid))
    );
  }

  open(content) {
		this.modalService.open(content).result.then(
			buttonType => {

        if (buttonType == 'role') {
          console.log('role updated')
        }

        if (buttonType == 'del') {
          console.log('user deleted')
        }
        
			}, err => {/* modal is closed */}
		);
	}

  logout() {
    this.auth.logout();
  }

}
