import { Component, computed, Inject, inject, input } from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
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

  // Another way to access route data
  // private activatedRoute = inject(ActivatedRoute);
  // ngOnInit(): void {
  //   this.activatedRoute.data.subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //   });
  // }
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

// Dynamic page title
export const resolveTitle: ResolveFn<string> = (
  ar: ActivatedRouteSnapshot,
  rs: RouterStateSnapshot
) => {
  return resolveUserName(ar, rs) + "'s Tasks";
};
