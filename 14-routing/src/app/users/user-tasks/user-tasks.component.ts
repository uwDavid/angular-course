import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent {
  // userId = input.required<string>();
  // private userServce = inject(UsersService);

  // Route data
  message = input.required<string>();

  // ngOnInit(): void {
  //   console.log('Input data defined in route: ' + this.message());
  // }
  // userName = computed(
  //   () => this.userServce.users.find((u) => u.id === this.userId())?.name
  // );

  // using Dynamic Route Data
  userName = input.required<string>();
}

// export function resolveUserName(){}
// we use the below syntax to give it at type to the constant
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';

  return userName;
};
