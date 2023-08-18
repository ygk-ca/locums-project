import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from '../users/services/user.service';
import { User } from '../users/models/user';
import { Observable, filter, switchMap, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.css']
})
export class ClinicComponent {

  user$: Observable<User>;
  clinicShifts: any;

  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private userService: UserService, private afs: AngularFirestore) {}

  async ngOnInit() {
    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user!.uid))
    );
    this.clinicShifts = await this.getShifts();
  }

  logout() {
    this.auth.logout()
  }

  async getShifts() {
    const email = await firstValueFrom(this.afAuth.user).then(user => user?.email || "err");
    const clinicShifts = await firstValueFrom(this.afs.collection("clinics").doc(email).get()).then(doc => doc.data()!["shifts"]);
    if (Object.keys(clinicShifts).length == 0) {
      return ['No Shifts Submitted']
    }
    return clinicShifts;
  }
}
