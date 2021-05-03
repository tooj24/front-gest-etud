import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { StudentShowComponent } from '../student-show/student-show.component';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})

export class StudentListComponent implements OnInit {
  studentData: Student[];
  displayedColumns: string[] = ['lastName', 'firstName', 'gender', 'promotion', 'university', 'show', 'edit', 'delete'];

  // pagination
  page: number = 1;
  itemsPerPage: number = 10;
  count: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // sort
  col: string;
  dir: string;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private studentService: StudentService, private dialog: MatDialog) {
    this.getStudents()
  }

  ngOnInit() {

  }

  // get students list
  getStudents() {
    this.studentService.getAllStudents(this.page, this.itemsPerPage, '', this.col, this.dir).subscribe(data => {
      this.studentData = data['hydra:member'];
      this.count = data['hydra:totalItems'];
    })
  }

  // change page
  handlePage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.getStudents();
  }

  // change sort
  customSort(event: any) {
    console.log('hehe', event)
    this.col = event.active;
    this.dir = event.direction;
    this.getStudents();
  }

  // show student
  details(student: Student) {
    this.dialog.open(StudentShowComponent, { data: student });
  }

  // delete student
  deleteStudent(id: number) {
    if(window.confirm('Are you sure')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.getStudents();
      });
    }
  }

}