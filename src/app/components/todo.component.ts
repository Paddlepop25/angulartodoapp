import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ToDo } from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  taskAddedByUser = [] // will be array of objects

  form: FormGroup;
  description = new FormControl('', [Validators.required]);
  priority = new FormControl('', [Validators.required]);
  due = new FormControl('', [Validators.required, taskDueDateValidator]);

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      description: this.description,
      priority: this.priority,
      due : this.due,
    });
   }

   // this todoForm is for html to submit (ngSubmit)="todoForm()
   todoForm(): void {
    let todo = new ToDo(
      this.form.value.description,
      this.form.value.priority,
      this.form.value.due
      )
    // console.log(todo); //is an object
    // console.log(this.form.value.due);
    let taskDate = this.form.value.due;
    
    let dateTokens = taskDate.split("-");
    // console.log('dateTokens --->', dateTokens); 
    //creating date object from specified year, month, and day
    let pendingDate = new Date(dateTokens[0], dateTokens[1] - 1, dateTokens[2]);
    // console.log("pendingDate: ", pendingDate);
    let displayDate = pendingDate.toDateString()
    todo.due = displayDate
    // console.log(todo)
    // console.log("displayDate: ", displayDate); // Mon Nov 02 2020
    let pendingAddToFormDate = pendingDate.getTime()
    // console.log("pendingAddToFormDate in milliseconds: ", pendingAddToFormDate); // number

    let todayDate = Date.now()
    // console.log('todayDate ---> ', todayDate); // number

    if (todayDate - pendingAddToFormDate > 0) {
      // send error message to user
      console.log("Send message to user")
    } else {
      this.taskAddedByUser.push(todo)
    }
    
    // console.log('>>> this.form --->', this.form.value); 
    console.log('>>> this.taskAddedByUser --->', this.taskAddedByUser); 

    // reset form after hit submit button
    
    // this.form.value.description = ""
    // this.form.value.priority = ""
    // this.form.value.due = ""
  }
  
  ngOnInit(): void {
  }
  
}

function taskDueDateValidator(control: AbstractControl): {[key: string]: boolean} | null {
  const todayDate = new Date();
  const dueDate = new Date(control.value);

  if (dueDate < todayDate ) {
    return { 'taskDueDateValidator': true };
  }
  return null;
}