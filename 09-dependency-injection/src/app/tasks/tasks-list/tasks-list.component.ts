import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TaskService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  // selectedFilter = signal<string>('all');

  // Another way to inject Service - via inject()
  private taskService = inject(TaskService);
  // note here that this is a writeable signal

  // tasks = this.taskService.allTasks;

  // Change Task Status
  private selectedFilter = signal<string>('all');
  tasks = computed(() => {
    // computed() => sets up signal subscription
    // it will recalculate when selectedFilter() || allTasks() changes
    switch (this.selectedFilter()) {
      // case 'all':
      //   return this.taskService.allTasks();
      case 'open':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService
          .allTasks()
          .filter((task) => task.status === 'DONE');
      default:
        return this.taskService.allTasks();
    }
  });
  // computes based on signals received

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
