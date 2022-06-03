import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError, map } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {Movie, MovieResult} from '../interfaces/movie'
import { Genre, GenreResponse } from '../interfaces/genre';
import { Backdrop, BackdropResponse } from '../interfaces/images';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }


  private handleError(error: HttpErrorResponse){
    let errMessage = error.error.errors[0]
    return throwError(() => new Error(errMessage));
  }


  getMovies(pageNum:number = 1): Observable<Array<Movie>> {
    let params = new HttpParams();
    params = params.append("page", pageNum);
    params = params.append("api_key",environment.apiKey);
    return this.httpClient.get<MovieResult>(`${environment.apiUrl}/movie/popular`, {params})
      .pipe(
        retry(3),
        map((data) => data.results || []),
        catchError(this.handleError)
      );
  }

  getGenres(): Observable<Array<Genre>> {
    let params = new HttpParams();
    params = params.append("api_key", environment.apiKey);
    return this.httpClient.get<GenreResponse>(`${environment.apiUrl}/genre/movie/list`, {params})
    .pipe(
      retry(3),
      map((data) => data.genres || []),
      catchError(this.handleError)
    )
  }


  getMovieImages(movieId:number):Observable<Array<Backdrop>>{
    let params = new HttpParams();
    params = params.append("api_key", environment.apiKey);
    return this.httpClient.get<BackdropResponse>(`${environment.apiUrl}/movie/${movieId}/images`, {params})
    .pipe(
      retry(3),
      map((data) => data.backdrops || null),
      catchError(this.handleError)
    )
  }
}
