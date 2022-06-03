import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../interfaces/appstate';
import { SelectedMovie } from '../interfaces/selected-movie';

export const selectMovies = createFeatureSelector<AppState>("movies");

export const selectAllMovies = createSelector(
    selectMovies,
    (state) => state.movies
);



export const spinnerStateSelector = createFeatureSelector<AppState>("spinnerVisible");

export const selectSpinnerState = createSelector(
    spinnerStateSelector,
    (state) => state.spinnerVisible
);



export const moviePreviewSelector = createFeatureSelector<AppState>("selectedMovie");

export const selectMoviePreview = createSelector(
    moviePreviewSelector,
    (state) => {
        let {selectedMovie, selectedImages} = state;
        let movieDetails: SelectedMovie = {
            selectedMovie, 
            selectedImages
        }
        return movieDetails;
    }
)



export const genreSelector = createFeatureSelector<AppState>("genres");

export const selectGenreNames = createSelector(
    moviePreviewSelector, 
    genreSelector,
    (state) => {
        let {selectedMovie, genres} = state;
        return genres.filter(genre => selectedMovie?.genre_ids.includes(genre.id))
    }
)



export const notificationSelector = createFeatureSelector<AppState>("notification");

export const selectNotification = createSelector(
    notificationSelector,
    (state) => state.notification
)