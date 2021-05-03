import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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

  // create
  createStudent() {

  }

  // update
  updateStudent() {

  }

  // delete
  deleteStudent() {

  }
}
