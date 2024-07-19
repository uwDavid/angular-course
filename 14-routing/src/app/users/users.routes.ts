import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import {
  canLeaveEditPage,
  NewTaskComponent,
} from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    // if no url segment after /:userId => we want to redirect to /:userId/tasks
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'prefix',
  },
  {
    path: 'tasks', //<domain>/users/<uid>/tasks
    component: TasksComponent,
    // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
    // canDeactivate Guard
    canDeactivate: [canLeaveEditPage],
  },
];
