import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskCreate, TaskService } from '@app/task/data-access/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  constructor(
    private formBuiler: FormBuilder,
    private router: Router,
    private taskService: TaskService) { }

  loading = signal(false)

  form = this.formBuiler.group({
    title: this.formBuiler.control('', Validators.required),
    description: this.formBuiler.control('', Validators.required),
    completed: this.formBuiler.control(false, Validators.required)
  })

  async submit() {
    if (this.form.invalid) return

    try {
      this.loading.set(true)
      const { title, description, completed } = this.form.value
      const task: TaskCreate = {
        title: title || '',
        description: description || '',
        completed: !!completed
      }
      await this.taskService.create(task)
      alert("task add")
      this.router.navigateByUrl('/tasks')
    } catch (error) {
      alert("ERROR")
    } finally {
      this.loading.set(false)
    }
  }
}
