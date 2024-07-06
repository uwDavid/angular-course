import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, subscribeOn, throwError } from 'rxjs';

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
  isFetching = signal(false);
  errorMsg = signal(''); // we set this signal if error occurs

  // Fetch data
  ngOnInit() {
    // populate data when component is ready
    // .get() returns an observable
    // we need to subscribe() to trigger the GET request
    // and then pass an observer function to handle the response

    this.isFetching.set(true);

    const subscription = this.httpClient
      .get<{ places: Place[] }>('http://localhost:3000/places')
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(() => new Error('Something went wrong'));
        })
      )
      // convert places: Place[] to just array Place[]
      .subscribe({
        next: (places) => {
          // console.log(resData.places);
          this.places.set(places);
        },
        error: (error: Error) => {
          // console.log(error.message);
          // this.errorMsg.set('Something went wrong. Try again later.');
          this.errorMsg.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
          // we can technically do this in next
          // but this is safer, if we emit multiple events
        },
      });

    // Note: we can define the format of response data
    // expected response json: {places: placesData} - see backend app.js
    // we define this as a model place.model.ts

    // CONFIGURE HTTP REQUEST
    // const subscription = this.httpClient
    //   .get<{ places: Place[] }>('http://localhost:3000/places', {
    //     observe: 'response',
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response.body?.places);
    //       // response may not have a body
    //     },
    //   });

    // good practice to clean up subscription
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    // this PUT req route: expects a placeId
    // we need to subscribe() in order to trigger the request
    this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: selectedPlace.id,
      })
      .subscribe({
        next: (resData) => console.log(resData),
      });
  }
}
