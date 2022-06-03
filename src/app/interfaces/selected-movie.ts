import { Backdrop } from "./images";
import { Movie } from "./movie";

export interface SelectedMovie {
    selectedMovie: Movie | null;
    selectedImages: Backdrop[];
}