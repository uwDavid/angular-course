import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // this injects service into root -> directly usable by Task Service
  // thus, we can just use inject() in the Task Service
})

// We want to inject this service into Task Service
export class LoggingService {
  log(message: string) {
    const timeStamp = new Date().toLocaleDateString();
    console.log(`[${timeStamp}]: ${message}`);
  }
}
