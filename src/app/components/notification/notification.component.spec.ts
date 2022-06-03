import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { notificationSelector } from 'src/app/selectors/movies.selectors';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
        provideMockStore({
          initialState: {movies: [], allMovies: [], genres: [], selectedMovie: {}},
          selectors: [
            { selector: notificationSelector, value: {type: 'success', visible: true, content: 'Test'} },
          ],
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
