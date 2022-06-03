import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { selectAllMovies, selectGenreNames } from './selectors/movies.selectors';

describe('AppComponent', () => {

  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        provideMockStore({
          initialState: {movies: [], allMovies: [], genres: []},
          selectors: [
            { selector: selectAllMovies, value: ['Book 1', 'Book 2'] },
            { selector: selectGenreNames, value: ['Book 1'] },
          ],
        }),
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
