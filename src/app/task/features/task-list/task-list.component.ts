import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task, TaskService } from '@app/task/data-access/task.service';
import { TableComponent } from '@app/task/ui/table/table.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TableComponent, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export default class TaskListComponent {
  tasks: () => Task[];  

  constructor(private taskService: TaskService) { 
    this.tasks = this.taskService.getTasks();  

    effect(() => {
      console.log(this.tasks());  
    });
  }
}
