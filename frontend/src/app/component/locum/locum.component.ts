import { Component } from '@angular/core';
import { User } from '../users/models/user';
import { Observable, filter, firstValueFrom, from, switchMap } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserService } from '../users/services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

declare var Email: any;

@Component({
  selector: 'app-locum',
  templateUrl: './locum.component.html',
  styleUrls: ['./locum.component.css']
})
export class LocumComponent {
  user$: Observable<User>;
  selectedClinic: string = ""; // Tracks the selected clinic
  selectedShift: string = "";
  clinics: string[] = this.getClinics(); // Sample clinic data
  shifts: string[] = []; // Will be populated based on selected clinic
  originalShift: any = {};
  isSaving = false;
  form = new FormGroup({
    text: new FormControl('')
  });

  async updateSecondSelect() {
    // Logic to update shifts based on selectedClinic
    if (this.selectedClinic) {
      this.shifts = await this.getClinicShift(this.selectedClinic);
    } else {
      this.shifts = []; // No selected clinic, clear shifts
      this.selectedShift = "";
    }
  }

  get emailSubject() {
    return `Shift Inquiry | ${this.selectedShift} | ${this.selectedClinic}`;
  }

  constructor(private auth: AuthService, private userService: UserService, private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  async ngOnInit() {
    this.user$ = this.afAuth.user.pipe(
      filter(user => !!user),
      switchMap(user => this.userService.user$(user!.uid))
    );
  }

  logout() {
    this.auth.logout();
  }

  getClinics() {
    const collectionRef = this.afs.collection("clinics");
    let clinicNames: string[] = [];

    firstValueFrom(from(collectionRef.get()))
      .then((querySnapshot) => {
        if (querySnapshot) {
          querySnapshot.forEach((doc) => {
            // doc.data() contains data of each document in the collection
            clinicNames.push(doc.id);
          });
        } else {
          console.error("No documents found.");
        }
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      }); 

      return clinicNames;   
  }

  async getClinicShift(email) {
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

  sendEmail(selectedClinic, selectedShift, email) {
    let { text } = this.form.value;
    
    if ( selectedClinic !== null && selectedClinic !== undefined && selectedShift !== null && selectedShift !== undefined && text !== null && text !== undefined && text.length > 150) {
      this.isSaving = true;
      try {
        Email.send({
          Host : "smtp.elasticemail.com",
          Username : "hsami@cityofkingston.ca",
          Password : "836E0ED8F2ACBA227760A1EEFB93715D1B0B",
          To : selectedClinic,
          From : "hsami@cityofkingston.ca",
          Subject : `Shift Inquiry: ${selectedShift} - ${email}: `,
          Body : text
      })
      // .then(
      //   message => alert(message)
      // );
        alert('Email sent successfully')
      } catch (error) {
        console.error(error);
        alert("An error occurred");
      } finally {
        // Enable the button and hide loading state
        this.isSaving = false;
        
        // Optionally, refresh the page or perform any other necessary action
        window.location.reload();
      }
    }
    else {
      alert("Please select a valid shift, clinic, and enter a message.")
    }
  }
}
