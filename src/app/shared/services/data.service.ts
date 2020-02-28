import { Moment } from 'moment';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Listing } from '../models/listing.model';
import { Note } from '../models/note.model';
import { SearchData } from '../models/searchData.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private postOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  public getListings(search: SearchData): Observable<Listing[]> {
    return this.http.get<Listing[]>(
      this.getFullUrl(
        `listings?dest=${search.destination.name}&lat=${search.destination.lat}&lng=${search.destination.lng}&start=${this.getFormattedDate(search.date.start)}&end=${this.getFormattedDate(search.date.end)}&guests=${search.guests.total}`
      ));
  }

  public getUser(uid: number): Observable<User> {
    return this.http.get<User>(this.getFullUrl('user?uid=' + uid));
  }

  public getNotes(uid: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.getFullUrl('notes?uid=' + uid));
  }

  public addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.getFullUrl('addNote'), note, this.postOptions);
  }

  public updateNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.getFullUrl('updateNote'), note, this.postOptions);
  }

  public deleteNote(noteId: number) {
    return this.http.delete(this.getFullUrl('deleteNote?nid=' + noteId));
  }

  public login(email: string): Observable<any> {
    return this.http.post<any>(this.getFullUrl('checkLogin'), {email}, this.postOptions);
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(this.getFullUrl('register'), user, this.postOptions);
  }

  private getFullUrl(url: string): string {
    return environment.apiUrl + '/' + url;
  }

  private getFormattedDate(date: Moment): string {
    return date.format('YYYY-MM-DD');
  }

}
