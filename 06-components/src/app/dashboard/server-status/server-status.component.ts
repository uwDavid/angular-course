import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  // currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  // typscript- Literal Types
  // to only allow specific set of string values

  constructor() {}

  // clean up setInterval() on destroy - method 1 - create interval var, and use ngOnDestroy()
  // private interval?: NodeJS.Timeout;
  // private interval?: ReturnType<typeof setInterval>;
  // this is TS syntax: type for interval should be the type returned by the setInterval()

  // method 2 - use destroyRef
  private destroyRef = inject(DestroyRef);

  // ngOnInit - after all Inputs are loaded
  ngOnInit() {
    // setInterval() is a javascript func - executes code on every interval
    // arg1: func to exec, arg2: interval in ms
    const interval = setInterval(() => {
      const rnd = Math.random(); // 0-0.9999
      if (rnd < 0.5) {
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
    });
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.interval);
  // }
}
