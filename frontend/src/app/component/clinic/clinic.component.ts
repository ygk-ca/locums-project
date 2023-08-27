import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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
  originalShift: any = {};
  clinicShifts: any;
  isSaving = false;
  form = new FormGroup({
    startingDate: new FormControl(''),
    endingDate: new FormControl(''),
    clinicName: new FormControl(''),
    mainDoctor: new FormControl(''),
    additionalNotes: new FormControl('')
  })
  deleteForm = new FormGroup({
    delShift: new FormControl('')
  })

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
    const cShifts = await firstValueFrom(this.afs.collection("clinics").doc(email).get()).then(doc => doc.data()!["shifts"]);
    if (Object.keys(cShifts).length == 0) {
      return ['No Shifts Submitted']
    }
    else {
      let shifts: any = [];
      for (let shift in cShifts) {
        let startDate: any = new Date(this.convertDateFormat(cShifts[shift].start))
        startDate = startDate.toDateString();
        startDate = startDate.substring(3, 15);

        let endDate: any = new Date(this.convertDateFormat(cShifts[shift].end))
        endDate = endDate.toDateString();
        endDate = endDate.substring(4, 15);

        let shiftValues =  startDate + ' - ' + endDate;
        shifts.push(shiftValues);
        
        this.originalShift[shiftValues] = shift;
      }
      shifts.sort((a, b) => a.localeCompare(b));
      return shifts;
    }
  }

  convertDateFormat(inputDate) {
    // Split the input date string into year, month, and day parts
    const [year, month, day] = inputDate.split("-");
  
    // Rearrange the parts to the MM/DD/YYYY format
    const formattedDate = `${month}/${day}/${year}`;
  
    return formattedDate;
  }

  async addShift() {
    let { startingDate, endingDate, clinicName, mainDoctor, additionalNotes } = this.form.value;
    
    if (!startingDate || !endingDate || !additionalNotes || !clinicName || !mainDoctor) {
      alert('Missing Fields!');
    } else if (endingDate < startingDate) {
      alert('Invalid Dates!');
    } else {
      // Disable the button and show loading state
      this.isSaving = true; // Create a boolean variable in your component to track the loading state
  
      try {
        let email = await firstValueFrom(this.afAuth.user).then(user => user?.email || "err");
        let info = {
          start: startingDate,
          end: endingDate,
          text: clinicName + '\n' + mainDoctor + '\n' + additionalNotes
        };
        let response = await firstValueFrom(await this.userService.addShift(email, info));
  
        // Show success alert or message
        alert(response["message"]);
      } catch (error) {
        // Handle error and show error alert or message
        console.error(error);
        alert('An error occurred.');
      } finally {
        // Enable the button and hide loading state
        this.isSaving = false;
        
        // Optionally, refresh the page or perform any other necessary action
        window.location.reload();
      }
    }
  }
  
  async deleteShift() {
    let { delShift } = this.deleteForm.value;
    if (delShift == "" || delShift == null) {
      alert("Please select a shift!");
    }
    else {
      this.isSaving = true;
      try {
        let email = await firstValueFrom(this.afAuth.user).then(user => user?.email || "err");
        let shiftKey = this.originalShift[delShift];
        let response = await firstValueFrom(await this.userService.deleteShift(email, shiftKey));
        alert(response["message"]);

      } catch (error) {
        // Handle error and show error alert or message
        console.error(error);
        alert('An error occurred.');
      } finally {
        // Enable the button and hide loading state
        this.isSaving = false;
        
        // Optionally, refresh the page or perform any other necessary action
        window.location.reload();
      }
    }
  }
}
