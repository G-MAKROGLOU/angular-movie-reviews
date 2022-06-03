import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { setMovieImages, setMovies, setSelectedMovie, toggleNotification, toggleSpinner } from 'src/app/actions/movies.actions';
import { AppState } from 'src/app/interfaces/appstate';
import { Backdrop } from 'src/app/interfaces/images';
import { Movie, MovieResult } from 'src/app/interfaces/movie';
import { selectMoviePreview } from 'src/app/selectors/movies.selectors';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [MoviesService]
})
export class SidebarComponent implements OnInit {

  constructor(private store: Store<AppState>, private moviesService: MoviesService){}

  page = 1;

  @Input() movies: Movie[] | null = []

  
  showMore(movie:Movie):void{
    this.store.dispatch(toggleSpinner({spinnerState: true}))
    this.store.dispatch(setSelectedMovie({selectedMovie: movie}))

    this.moviesService
    .getMovieImages(movie.id)
    .subscribe({
      next: (data: Backdrop[]) => {
        this.store.dispatch(toggleSpinner({spinnerState: false}))
        this.store.dispatch(setMovieImages({images: data}))
      },
      error: (err) => {
          this.store.dispatch(toggleSpinner({spinnerState: false}))
            this.store.dispatch(toggleNotification({notification: {
              visible: true,
              type: 'error',
              content: err.message
          }}))
      }
    })
  }


  nextPage(){
    this.page = this.page+1;
    this.store.dispatch(toggleSpinner({spinnerState: true}))
    this.moviesService
      .getMovies(this.page)
      .subscribe({
        next: (data:Movie[]) => {
          if(data.length > 0){
            this.store.dispatch(setMovies({ movies: data }))
          }
          this.store.dispatch(toggleSpinner({spinnerState: false}))
        },
        error: (err) => {
          this.store.dispatch(toggleSpinner({spinnerState: false}))
          this.store.dispatch(toggleNotification({notification: {
            visible: true,
            type: 'error',
            content: err.message
          }}))
        }
      })
  }

  

  previousPage(){
    this.page = this.page-1;
    this.store.dispatch(toggleSpinner({spinnerState: true}))
    this.moviesService
      .getMovies(this.page)
      .subscribe({
        next: (data:Movie[]) => {
          if(data.length > 0){
            this.store.dispatch(setMovies({ movies: data }))
          }
          this.store.dispatch(toggleSpinner({spinnerState: false}))
      },
      error: (err) => {
        this.store.dispatch(toggleSpinner({spinnerState: false}))
        this.store.dispatch(toggleNotification({notification: {
          visible: true,
          type: 'error',
          content: err.message
        }})) 
      } 
      })
  }

  ngOnInit(): void {}
}
