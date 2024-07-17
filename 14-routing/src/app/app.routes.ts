import { Routes } from '@angular/router';
import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', // <domain-url>/
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <domain-url>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: 'hello',
    },
    resolve: {
      userName: resolveUserName,
      // note: we don't execute resolveUserName(), instead we just point at the resolver function
      // Angular will execute it for us
    },
    title: resolveTitle,
  },
  {
    // fallback catch-all route
    // url stays as user entered it
    path: '**',
    component: NotFoundComponent,
  },
  // {
  //   path: 'tasks', // <domain-url>/tasks
  //   component: TasksComponent,
  // },
];
