import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching available places.'
    );
  }

  loadUserPlaces(): Observable<Place[]> {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching user places.'
    ).pipe(
      tap({
        //execute like subscribe, without subscribing
        next: (userPlaces) => this.userPlaces.set(userPlaces),
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {
    // update in-memory signal
    const prevPlaces = this.userPlaces(); // reads value 1x

    // check to ensure place isn't already added
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.update((prevPlaces) => [...prevPlaces, place]);
    }

    return this.httpClient
      .put('http://localhost:3000/user-places', {
        placeId: place.id,
        // placeId, // this is a shorthand
      })
      .pipe(
        catchError((error) => {
          // add rollback
          this.userPlaces.set(prevPlaces);
          this.errorService.showError('Failed to store selected place.');
          return throwError(() => new Error('Failed to store selected place.'));
        })
      );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      })
    );
    // return an Observable
  }
}
