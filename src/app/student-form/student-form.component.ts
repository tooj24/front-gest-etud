import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService, private route: Router) { }

  ngOnInit(): void {
    this.submitForm();
  }

  // submit form
  submitForm() {
    this.studentForm = this.fb.group({
      title: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      gender: ['Male'],
      birth: ['', Validators.required],
      email: ['', Validators.required],
      linkedin: ['', Validators.required],
      streetName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      university: ['', Validators.required],
      promotion: ['', Validators.required],
      plannedCareer: ['', Validators.required],
      preferedColor: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      company: ['', Validators.required],
    })
  }

  // save
  saveStudent(event: any) {
    event.preventDefault();
    if(this.studentForm.valid) {
      console.log('hehe');
      this.studentService.createStudent(this.studentForm.value).subscribe(data => {
        this.route.navigate(["students"]);
      });
    }
  }

  // get error
  public handleError = (controlName: string, errorName: string) => {
    return this.studentForm.controls[controlName].hasError(errorName);
  }

  // format date
  formatDate(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.studentForm.get('birth')?.setValue(convertDate, {
      onlyself: true
    })
  }  

}
