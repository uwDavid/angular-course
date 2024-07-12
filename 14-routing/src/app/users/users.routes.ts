import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

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
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];