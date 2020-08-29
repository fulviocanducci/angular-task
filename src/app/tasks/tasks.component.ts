import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Task from '../models/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(private taskService: TaskService, private router: Router) {}
  tasks: Array<Task>;
  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe((data: Array<Task>) => (this.tasks = data));
  }
  editTask(event: MouseEvent, id: number) {
    this.router.navigate(['task', id]);
  }
  deleteTask(event: MouseEvent, id: number) {
    if (confirm('Deseja excluir?')) {
      this.taskService.deleteTask(id).subscribe((data) => {
        this.tasks = this.tasks.filter((x) => x.id !== id);
      });
    }
  }
}
