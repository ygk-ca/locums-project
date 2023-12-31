import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../users/services/user.service';
import { User } from '../users/models/user';
import { Observable, filter, firstValueFrom, switchMap } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users$: Observable<User[]>;
  user$: Observable<User>;
  public setRole: FormGroup;
  public deleteUser: FormGroup;
  public getRole: FormGroup;
  email: string = '';
  role: string = '';
  delEmail: string = '';
  roleEmail: string = '';

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private auth: AuthService, private modalService: NgbModal, private fb: FormBuilder) {
    this.setRole = this.fb.group({
      email: '',
      role: ''
    })
    this.deleteUser = this.fb.group({
      delEmail: ''
    })
    this.getRole = this.fb.group({
      roleEmail: ''
    })
  }
  
  ngOnInit() {
    this.users$ = this.userService.users$;

    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user!.uid))
    );
  }

  open(content: any) {
		this.modalService.open(content).result.then(
			async buttonType => {

        if (buttonType == 'role') {
          this.email = this.setRole.get('email')?.value;
          this.role = this.setRole.get('role')?.value;
          if (this.email == '' || this.role == '') {
            alert('Error: Missing Fields');
          }
          else {
            let emailExists = await this.auth.checkEmailExists(this.email)
              .then(res => {
                return res;
              })
              .catch(() => {
                return false;
              });

            if (emailExists) {
              let info = await firstValueFrom(await this.userService.editUser(this.email, this.role))
              let infoString: string = 'USER DATA: \n\n';
              for (const key in info) {
                infoString += `${key}: ${info[key]}` + '\n'
              }
              alert(infoString)
            }
            else {
              alert('User with that Email does not exist!')
            }
          }
          this.email = '';
          this.role = '';
          this.setRole = this.fb.group({
            email: '',
            role: ''
          })
        }

        if (buttonType == 'del') {
          this.delEmail = this.deleteUser.get('delEmail')?.value;
          if (this.delEmail == '') {
            alert('Please enter an Email')
          }
          else {
            let emailExists = await this.auth.checkEmailExists(this.delEmail)
              .then(res => {
                return res;
              })
              .catch(() => {
                return false;
              });

            if (emailExists) {
              this.userService.delete(this.delEmail);
              alert('User Successfully Deleted!')
            }
            else {
              alert('User with that Email does not exist!')
            }
          }
          this.delEmail = '';
          this.deleteUser = this.fb.group({
            delEmail: ''
          })
        }

        if (buttonType == 'check') {
          this.roleEmail = this.getRole.get('roleEmail')?.value;
          if (this.roleEmail == '') {
            alert('Please enter an Email')
          }
          else {
            let emailExists = await this.auth.checkEmailExists(this.roleEmail)
              .then(res => {
                return res;
              })
              .catch(() => {
                return false;
              });

            if (emailExists) {
              let info = await firstValueFrom(await this.userService.getUser(this.roleEmail));
              let infoString: string = 'USER DATA: \n\n';
              for (const key in info) {
                infoString += `${key}: ${info[key]}` + '\n'
              }
              alert(infoString)
            }
            else {
              alert('User with that Email does not exist!')
            }
          }
          this.roleEmail = '';
          this.getRole = this.fb.group({
            roleEmail: ''
          })
        }
        
			}, err => {
        /* modal is closed */
        this.email = '';
        this.role = '';
        this.delEmail = '';
        this.roleEmail = '';
        this.setRole = this.fb.group({
          email: '',
          role: ''
        })
        this.deleteUser = this.fb.group({
          delEmail: ''
        })
        this.getRole = this.fb.group({
          roleEmail: ''
        })
      }
		);
	}

  logout() {
    this.auth.logout();
  }

}
