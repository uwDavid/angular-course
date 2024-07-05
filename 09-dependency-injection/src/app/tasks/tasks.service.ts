import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // tasks = [];
  private tasks = signal<Task[]>([]);
  // initialize tasks signal with empty array []
  allTasks = this.tasks.asReadonly();

  // inject Logging Service
  // since Logging Service already is providedIn: 'root', we can just inject() it
  private loggingService = inject(LoggingService);

  addTask(taskData: { title: string; description: string }) {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(),
      status: 'OPEN',
    };

    this.tasks.update((oldTasks) => [...oldTasks, newTask]);
    this.loggingService.log('Added Task: ' + taskData.title);
  }

  updateTaskStatus(taskId: string, newStatus: TaskStatus) {
    this.tasks.update((oldTasks) =>
      oldTasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    this.loggingService.log('Changed task status to ' + newStatus);
  }
}
