import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task, TaskService } from '../../data-access/task.service';
import { TableComponent } from '../../ui/table/table.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export default class TaskListComponent {
  
  tasks: () => Task[];

  constructor(public taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

}
