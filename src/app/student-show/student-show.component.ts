import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from '../models/student';

@Component({
  selector: 'app-student-show',
  templateUrl: './student-show.component.html',
  styleUrls: ['./student-show.component.scss']
})
export class StudentShowComponent implements OnInit {

  gridLeft: string[] = ['title', 'lastName', 'firstName', 'gender', 'birth', 'email', 'linkedin', 'streetName', 'streetAdress'];

  gridRight: string[] = ['preferedColor', 'plannedCareer', 'university', 'promotion', 'state', 'city', 'country', 'company'];

  constructor(@Inject(MAT_DIALOG_DATA) public student: any) { }

  ngOnInit(): void {
  }

}
