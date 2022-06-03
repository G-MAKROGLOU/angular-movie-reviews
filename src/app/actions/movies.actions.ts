import { createAction, props } from '@ngrx/store';
import { Genre } from '../interfaces/genre';
import { Backdrop } from '../interfaces/images';
import {Movie} from '../interfaces/movie'
import {Notification} from '../interfaces/notification'

export const setMovies = createAction(
    'Store Fetched Movies',
    props<{ movies: Movie[] }>()
);
   
export const filterMovies = createAction(
    'Filter Movies',
    props<{searchTerm: string}>()
)

export const toggleSpinner = createAction(
    'Show or Hide Loading Spinner',
    props<{spinnerState: boolean}>()
)

export const setGenres = createAction(
    'Store Fetched Genres',
    props<{genres: Genre[]}>()
)

export const setMovieImages = createAction(
    'Store Images of Selected Movie',
    props<{images: Backdrop[]}>()
)

export const setSelectedMovie = createAction(
    'Selected Movie For Preview',
    props<{selectedMovie: Movie}>()
)


export const toggleNotification = createAction(
    'Show or Hide Notification',
    props<{notification: Notification}>()
)