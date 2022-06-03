import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectAllMovies, selectGenreNames } from 'src/app/selectors/movies.selectors';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({
          initialState: {movies: [], allMovies: [], genres: []},
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
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
