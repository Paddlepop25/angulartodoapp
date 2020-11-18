import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToDo } from '../models/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  form: FormGroup;
  description = new FormControl('', [Validators.required]);
  priority = new FormControl('', [Validators.required]);
  due = new FormControl('', [Validators.required]);

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      description: this.description,
      priority: this.priority,
      due : this.due,
    });
   }

   // what is this processForm?
   processForm(){
    console.log(this.form.value);
    let todo = new ToDo(
      this.form.value.description,
      this.form.value.priority,
      this.form.value.due
    )
    // call httpclient pass the todo
    console.log(todo); 
    }
    ngOnInit(): void {
  }

}
