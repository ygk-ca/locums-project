import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type CreateUserRequest = { displayName: string, password: string, email: string, role: string, phoneNumber: string };
export type UpdateUserRequest = { uid: string } & CreateUserRequest;

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  // private baseUrl = 'https://us-central1-locumsfunc.cloudfunctions.net/api/users'
  private baseUrl = 'http://127.0.0.1:5001/locumsfunc/us-central1/api/users';

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {};

  get users$(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`${this.baseUrl}`).pipe(
      map(result => {
        return result.users;
      })
    );
  }

  user$(id: string): Observable<User> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/${id}`).pipe(
      map(result => {
        return result.user;
      })
    );
  }

  create(user: CreateUserRequest) {
    return this.http.post(`${this.baseUrl}`, user).pipe(
      map(_ => { })
    );
  }

  edit(user: UpdateUserRequest) {
    return this.http.patch(`${this.baseUrl}/${user.uid}`, user).pipe(
      map(_ => { }),
      catchError((err, caught) => {
        alert('Error in User Edit. Please make sure your Phone Number is unique and is in the form: 6471234567.');
        return err;
      })
    );
  }

  calendar() {
    return this.http.get(`http://127.0.0.1:5001/locumsfunc/us-central1/api/calendar`).pipe(
      map(result => {
        return result;
      }),
      // catchError((err, caught) => {
      //   console.log('calendar err');
      //   return err;
      // })
    );
  }

  delete(email: string) {
    return this.http.delete(`${this.baseUrl}`, {body: email}).subscribe(_ => {});
  }

  async getUser(email: string) {
    return this.http.get(`${this.baseUrl}/getByEmail/${email}`).pipe(
      map(result => {
        return result;
      })
    )
  }
}