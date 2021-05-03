import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  id: string;
  isAdd: boolean;
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.submitForm();
  }

  // submit form
  submitForm() {
    this.id = this.route.snapshot.params['id']
    this.isAdd = !this.id;

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
      state: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      company: ['', Validators.required],
    })
    if(!this.isAdd) {
      this.studentService.getStudent(+this.id).subscribe(data => this.studentForm.patchValue(data))
    }
  }

  // save
  saveStudent(event: any) {
    event.preventDefault();
    const student = this.studentForm.value;
    if(this.studentForm.valid) {
      if(this.isAdd) {
        this.studentService.createStudent(student).subscribe();
      } else {
        this.studentService.updateStudent(+this.id, student).subscribe();
      }
      this.router.navigate(["students"]);
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
