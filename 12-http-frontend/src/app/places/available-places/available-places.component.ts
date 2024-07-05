import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);

  // Send HTTP request to backend
  private httpClient = inject(HttpClient);
  // note: we need to set up a provider as well
  // we can use the providers:
  // or we can set it up at the root level

  private destroyRef = inject(DestroyRef);

  // Fetch data
  ngOnInit() {
    // populate data when component is ready
    // .get() returns an observable
    // we need to subscribe() to trigger the GET request
    // and then pass an observer function to handle the response
    const subscription = this.httpClient
      .get('http://localhost:3000/places')
      .subscribe({
        next: (resData) => {
          console.log(resData);
        },
      });

    // good practice to clean up subscription
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
