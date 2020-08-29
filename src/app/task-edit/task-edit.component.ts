import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Task from '../models/task';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  task: Task;

  taskForm: FormGroup = new FormGroup({
    id: new FormControl(0, Validators.required),
    name: new FormControl('', Validators.required),
    isDone: new FormControl(false),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.getTask(params.id);
    });
  }

  getTask(id: number) {
    this.taskService.getTask(id).subscribe((data: Task) => {
      this.task = data;
      this.taskForm.get('id').setValue(this.task.id);
      this.taskForm.get('name').setValue(this.task.name);
      this.taskForm.get('isDone').setValue(this.task.isDone);
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskService.putTask(this.taskForm.value).subscribe((result) => {
        this.router.navigate(['tasks']);
      });
    }
  }
}
