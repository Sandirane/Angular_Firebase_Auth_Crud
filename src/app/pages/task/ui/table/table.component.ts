import { Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task, TaskService } from '../../data-access/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  tasks = input.required<Task[]>();

  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  constructor(private taskService: TaskService) { }

  deleteTask(id: string) {
    this.successMessage.set(null);
    this.errorMessage.set(null);

    this.taskService.delete(id).then(() => {
      this.successMessage.set(`Task with id ${id} deleted successfully`);
      this.hideMessageAfterDelay('success');
    }).catch(() => {
      this.errorMessage.set(`Error deleting task ${id}`);
      this.hideMessageAfterDelay('error');
    });
  }

  private hideMessageAfterDelay(type: 'success' | 'error') {
    setTimeout(() => {
      if (type === 'success') {
        this.successMessage.set(null);
      } else {
        this.errorMessage.set(null);
      }
    }, 2000);
  }
}
