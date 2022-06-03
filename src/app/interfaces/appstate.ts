
import {Movie } from '../interfaces/movie'
import { Genre } from './genre';
import { Backdrop } from './images';
import { Notification } from './notification';

export interface AppState {
    movies: Movie[];
    allMovies: Movie[];
    selectedMovie: Movie | null;
    spinnerVisible: boolean;
    genres: Genre[];
    selectedImages: Backdrop[];
    notification: Notification
}
