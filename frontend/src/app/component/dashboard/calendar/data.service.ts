import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {HttpClient} from "@angular/common/http";
import { UserService } from "../../users/services/user.service";
@Injectable()
export class DataService {

  events: any[] = [
    {
      id: "1",
      start: new DayPilot.Date("2023-08-02T07:30:00"),
      end: new DayPilot.Date("2023-08-02T16:30:00"),
      text: "Belleville Clinic #3 \n Dr. Jake John \n 10:00 AM - 4:00 PM",
    }
  ];

  constructor(private http : HttpClient, private userService: UserService){
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

  getCalendar() {
    return this.userService.calendar();
  }

}
