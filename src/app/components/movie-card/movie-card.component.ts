import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/interfaces/appstate';
import { Genre } from 'src/app/interfaces/genre';
import { SelectedMovie } from 'src/app/interfaces/selected-movie';
import { selectMoviePreview, selectGenreNames } from 'src/app/selectors/movies.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  selected: SelectedMovie | null = null;
  imageUrl: string = environment.backdropUrl;
  genres: Genre[] = []

  constructor(private store: Store<AppState>) { 
    store.select(selectMoviePreview).subscribe(selected => {
      this.selected = selected;
    })

    store.select(selectGenreNames).subscribe(genreNames => {
      this.genres = genreNames;
    })

  }


  size(arraySize:number){
    return Array(Math.round(arraySize))
  }


  round(floatNum:number){
    return Math.round(floatNum)
  }

  

  ngOnInit(): void {}

}
