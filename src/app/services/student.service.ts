import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // get all
  getAllStudents(page: number, itemsPerPage: number, search?: string, col?: string, dir?: string) {
    let params = new HttpParams();
    params = search ? params.set('search', search) : params;
    params = col && dir ? params.set(`order[${col}]`, dir) : params;

    return this.http.get<any>(environment.baseUrl, {
      params: params
        .set('page', page.toString())
        .set('itemsPerPage', itemsPerPage.toString())
    })
      .pipe(
        map(data => data)
      )
  }

  // get by id
  getStudent(id: number) {
    return this.http.get(`${environment.baseUrl}/${id}`, {
      headers: { 'Accept': 'application/json' }
    })
      .pipe(
        map(data => data)
      );
  }

  // create
  createStudent(student: Student) {
    return this.http.post(environment.baseUrl, student).pipe(
      map(data => data)
    );
  }

  // update
  updateStudent(id: number, student: Student) {
    return this.http.put(`${environment.baseUrl}/${id}`, student).pipe(
      map(data => data)
    );
  }

  // delete
  deleteStudent(id: number) {
    return this.http.delete(`${environment.baseUrl}/${id}`).pipe(
      map(data => data)
    );
  }
}
