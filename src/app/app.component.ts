import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { setMovies, filterMovies, toggleSpinner, setGenres, toggleNotification } from './actions/movies.actions';
import { AppState } from './interfaces/appstate';
import {  Movie } from './interfaces/movie';
import {Genre} from './interfaces/genre'
import { selectAllMovies, selectSpinnerState } from './selectors/movies.selectors';
import { MoviesService } from './services/movies.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MoviesService]
})
export class AppComponent {

  _movies = this.store.select(selectAllMovies);
  _spinnerVisible = this.store.select(selectSpinnerState);

  constructor(private store: Store<AppState>, private movieService: MoviesService){}


  onMovieSearch(event:any){
    this.store.dispatch(filterMovies({searchTerm: event.target.value})) 
  }

  ngOnInit(){
    
    this.store.dispatch(toggleSpinner({spinnerState: true}))
    
    this.movieService
    .getGenres()
    .subscribe({
      next: (data: Genre[]) => {
        this.store.dispatch(setGenres({genres: data}))
  
        this.movieService
        .getMovies()
        .subscribe({
          next: (data:Movie[]) => {
            this.store.dispatch(setMovies({ movies: data }))
            this.store.dispatch(toggleSpinner({spinnerState: false}))
          },
          error: (error) => {
            this.store.dispatch(toggleSpinner({spinnerState: false}))
            this.store.dispatch(toggleNotification({notification: {
              visible: true,
              type: 'error',
              content: error.message
            }})) 
          } 
        })
      },
      error: (error) => {
        this.store.dispatch(toggleSpinner({spinnerState: false}))
        this.store.dispatch(toggleNotification({notification: {
          visible: true,
          type: 'error',
          content: error.message
        }})) 
      }
    })
  }

}
