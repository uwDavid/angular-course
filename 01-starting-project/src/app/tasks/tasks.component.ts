import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { type NewTaskData } from './task/task.model';
import { TasksService } from './tasks.service';
@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, NewTaskComponent],
})
export class TasksComponent {
  @Input({ required: true }) userId!: string;
  @Input({ required: true }) name!: string;
  // @Input() name: string | undefined;
  // @Input() name?: string;

  // DI
  // private taskService = new TasksService();
  // we want to use DI to instantiate TaskService
  // private tasksService: TasksService;
  // constructor(taskService: TasksService) {
  //   this.tasksService = taskService;
  // }
  constructor(private tasksService: TasksService) {}

  onSelectUser(id: string) {
    console.log('Selected user with id' + id);
  }

  get selectedUserTasks() {
    return this.tasksService.getUserTasks(this.userId);
  }

  // Add tasks feature
  isAddingTask = false;
  onStartAddTask() {
    this.isAddingTask = true;
  }

  // Close Add Task form feature
  onCloseAddTask() {
    this.isAddingTask = false;
  }
}
