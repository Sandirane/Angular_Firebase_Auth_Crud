import { CommonModule } from '@angular/common';
import { Component, effect, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService, TaskCreate, Task } from '../../data-access/task.service';

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
    private taskService: TaskService) {

    effect(() => {
      const id = this.idTask();
      if (id) {
        this.getTask(id);
      }
    });

  }

  loading = signal(false)

  idTask = input.required<string>()

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

      const id = this.idTask();

      if (id) {
        await this.taskService.update(task, id)
      } else {
        await this.taskService.create(task)
      }

      await this.taskService.create(task)
      alert(`task ${id ? 'update' : 'add'} `)
      this.router.navigateByUrl('/tasks')

    } catch (error) {
      alert("ERROR")
    } finally {
      this.loading.set(false)
    }
  }

  async getTask(id: string) {
    const taskSnapshot = await this.taskService.getTask(id);

    if (!taskSnapshot.exists()) return;

    const task = taskSnapshot.data() as Task;

    this.form.patchValue(task);
  }


}
