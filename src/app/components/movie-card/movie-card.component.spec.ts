import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MovieCardComponent } from './movie-card.component';
import { selectAllMovies, selectGenreNames } from 'src/app/selectors/movies.selectors';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  let store: MockStore;



  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieCardComponent ],
      providers: [
        provideMockStore({
          initialState: {movies: [], allMovies: [], genres: [], selectedMovie: {}},
          selectors: [
            { selector: selectAllMovies, value: ['Book 1', 'Book 2'] },
            { selector: selectGenreNames, value: ['Book 1'] },
          ],
        }),
      ]
      
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
