import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { filterMovies, setMovies, toggleSpinner, setSelectedMovie, setMovieImages, setGenres, toggleNotification } from '../actions/movies.actions';
import {AppState} from '../interfaces/appstate'

export const initialState: AppState = {
  movies: [],
  allMovies: [],
  selectedMovie: null,
  spinnerVisible: true,
  genres: [],
  selectedImages: [],
  notification: {
    visible: false,
    type: 'success',
    content: ''
  }
};

export const moviesReducer = createReducer(
  initialState,
  on(setMovies, (state, { movies }) => ({...state, movies, allMovies: movies})),
  on(filterMovies, (state, {searchTerm}) => {
    if(searchTerm === ''){
      return {...state, movies: state.allMovies}
    }
    let filteredMovies = state.allMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    return {...state, movies: filteredMovies}
  }),
  on(setSelectedMovie, (state, {selectedMovie}) => {
    return {...state, selectedMovie}
  }),
  on(toggleSpinner, (state, {spinnerState}) => {
    return {...state, spinnerVisible: spinnerState}
  }),
  on(setMovieImages, (state, {images}) => {
    return {...state, selectedImages:images}
  }),
  on(setGenres, (state, {genres}) => ({...state, genres})),
  on(toggleNotification, (state, {notification}) => ({...state, notification}))
)