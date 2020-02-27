import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  public getListings(search: SearchData): Observable<Listing[]> {
    return this.http.get<Listing[]>('assets/test/listing.json');
      return this.http.get<Listing[]>(
      this.getFullUrl(
        `/listings?dest=${search.destination}&start=${search.start}&end=${search.end}&guests=${search.guests}`
      ));
  }

  public getUser(uid: number): Observable<User> {
    return this.http.get<any>('assets/test/user.json');
    return this.http.get<User>(this.getFullUrl('/user?uid=' + uid));
  }

  public getNotes(uid: string): Observable<Note[]> {
    return this.http.get<any>('assets/test/notes.json');
    return this.http.get<Note[]>(this.getFullUrl('/notes?uid=' + uid));
  }

  public addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.getFullUrl('/addNote'), note);
  }

  public updateNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.getFullUrl('/updateNote'), note);
  }

  public deleteNote(noteId: number) {
    return this.http.delete(this.getFullUrl('/deleteNote?nid=' + noteId));
  }

  public login(email: string): Observable<any> {
    return this.http.get<any>('assets/test/checkLogin.json');
    return this.http.post<any>(this.getFullUrl('/checklogin'), {email});
  }

  public register(user: User): Observable<User> {
    return this.http.get<any>('assets/test/user.json');
    return this.http.post<User>(this.getFullUrl('/register'), user);
  }

  public getFullUrl(url: string): string {
    return environment.apiUrl + encodeURIComponent(url);
  }
}
