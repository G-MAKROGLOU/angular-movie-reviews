import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import {moviesReducer} from './reducers/movies.reducer'
import { StoreModule } from '@ngrx/store';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MovieCardComponent,
    LoadingSpinnerComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({ movies: moviesReducer, spinnerVisible: moviesReducer, genres: moviesReducer, selectedMovie: moviesReducer, notification: moviesReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }






// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

// import { booksReducer } from './state/books.reducer';
// import { collectionReducer } from './state/collection.reducer';
// import { StoreModule } from '@ngrx/store';

// import { AppComponent } from './app.component';
// import { BookListComponent } from './book-list/book-list.component';
// import { BookCollectionComponent } from './book-collection/book-collection.component';

// @NgModule({
//   imports: [
//     BrowserModule,
//     StoreModule.forRoot({ books: booksReducer, collection: collectionReducer }),
//     HttpClientModule,
//   ],
//   declarations: [AppComponent, BookListComponent, BookCollectionComponent],
//   bootstrap: [AppComponent],
// })
// export class AppModule {}


/*
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://github.com/ngrx/platform
*/

