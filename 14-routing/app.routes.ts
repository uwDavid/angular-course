import { Routes } from '@angular/router';
import { TasksComponent } from './src/app/tasks/tasks.component';
import { NoTaskComponent } from './src/app/tasks/no-task/no-task.component';

export const routes: Routes = [
  {
    path: '', // <domain-url>/
    component: NoTaskComponent,
  },
  {
    path: 'tasks', // <domain-url>/tasks
    component: TasksComponent,
  },
];
