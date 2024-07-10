import { Routes } from '@angular/router';
import { TasksComponent } from './src/app/tasks/tasks.component';

export const routes: Routes = [
  {
    path: 'task', // <domain-url>/tasks
    component: TasksComponent,
  },
];
