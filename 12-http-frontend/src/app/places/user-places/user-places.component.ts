import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;
  isFetching = signal(false);
  errorMsg = signal(''); // we set this signal if error occurs
  // private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  // ngOnInit() {
  //   this.isFetching.set(true);

  //   const subscription = this.httpClient
  //     .get<{ places: Place[] }>('http://localhost:3000/user-places')
  //     .pipe(
  //       map((resData) => resData.places),
  //       catchError((error) => {
  //         console.log(error);
  //         return throwError(
  //           () => new Error('Something went wrong fetching favorite places')
  //         );
  //       })
  //     )
  //     .subscribe({
  //       next: (places) => {
  //         this.places.set(places);
  //       },
  //       error: (error: Error) => {
  //         this.errorMsg.set(error.message);
  //       },
  //       complete: () => {
  //         this.isFetching.set(false);
  //       },
  //     });

  //   this.destroyRef.onDestroy(() => {
  //     subscription.unsubscribe();
  //   });
  // }

  // using Service
  ngOnInit() {
    this.isFetching.set(true);

    const subscription = this.placesService.loadUserPlaces().subscribe({
      // next: (places) => {
      //   this.places.set(places);
      // },
      // this done by tap() in service
      error: (error: Error) => {
        this.errorMsg.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
