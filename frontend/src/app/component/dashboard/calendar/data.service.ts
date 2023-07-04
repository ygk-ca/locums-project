import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {

  events: any[] = [
    {
      id: "1",
      start: DayPilot.Date.today().addDays(1).addHours(10),
      end: DayPilot.Date.today().addDays(1).addHours(16),
      text: "Belleville Clinic #3 \n Dr. Jake John \n 10:00 AM - 4:00 PM",
    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(18),
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(18),
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(18),
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(18),
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(18),
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(12),
      end: DayPilot.Date.today().addHours(18),
      text: "Kingston Clinic #1 \n Dr. John Cena \n 12:00 PM - 6:00 PM",
    }
  ];

  constructor(private http : HttpClient){
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

}
