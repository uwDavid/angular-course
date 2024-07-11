import { Routes } from '@angular/router';
import { TasksComponent } from './src/app/tasks/tasks.component';
import { NoTaskComponent } from './src/app/tasks/no-task/no-task.component';
import { UserTasksComponent } from './src/app/users/user-tasks/user-tasks.component';

export const routes: Routes = [
  {
    path: '', // <domain-url>/
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <domain-url>/users/<uid>
    component: UserTasksComponent,
  },
  // {
  //   path: 'tasks', // <domain-url>/tasks
  //   component: TasksComponent,
  // },
];
