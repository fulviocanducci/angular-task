import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Task from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent implements OnInit {
  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {}

  task: Task;

  taskForm: FormGroup = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    isDone: new FormControl(false),
  });

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.postTask(this.taskForm.value).subscribe((result) => {
        this.router.navigate(['tasks']);
      });
    }
  }
}
