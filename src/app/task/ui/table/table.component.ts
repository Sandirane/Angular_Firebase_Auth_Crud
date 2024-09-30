import { Component, input } from '@angular/core';
import { Task } from '@app/task/data-access/task.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  tasks = input.required<Task[]>()


}
