import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task, TaskService } from '@app/task/data-access/task.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  tasks = input.required<Task[]>()

  constructor(private taskService: TaskService) { }  

  deleteTask(id: string) {
    this.taskService.delete(id).then(() => { 
      alert(`Task with id ${id} deleted successfully`) 
    }).catch(error => {
      console.error("Error deleting task: ", error);
    });
  }

}
