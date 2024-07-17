import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { routes as userRoutes } from './users/users.routes';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route, segments) => {
  // return boolean (true / false) or Observable that returns boolean
  const router = inject(Router);

  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unauthorized'));
  // return false;
  //this breaks the app => we should re-direct
};

export const routes: Routes = [
  {
    path: '', // <domain-url>/
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <domain-url>/users/<uid>
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [dummyCanMatch],
    // again we only point at the Guard func
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
