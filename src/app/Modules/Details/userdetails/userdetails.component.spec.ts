import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserdetailsComponent } from './userdetails.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { loadUserDetails } from '../../../Core/Store/Actions/user-details.actions';

describe('UserdetailsComponent', () => {
  let component: UserdetailsComponent;
  let fixture: ComponentFixture<UserdetailsComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserdetailsComponent],
      providers: [
        provideMockStore({
          initialState: {
            userDetails: {
              user: {
                login: 'mojombo',
                name: 'Tom Preston-Werner',
                avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
              },
              loading: false,
              error: null,
            },
          },
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'mojombo' }),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(UserdetailsComponent);
    component = fixture.componentInstance;
    dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select user details from store', (done) => {
    component.users$.subscribe((user) => {
      expect(user).toEqual({
        login: 'mojombo',
        name: 'Tom Preston-Werner',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        id: 1,
        created_at: '2007-10-20T05:24:19Z',
        bio: 'null',
        public_repos: 66,
        followers: 24134,
        following: 11,
        company: '@chatterbugapp, @redwoodjs, @preston-werner-ventures',
        location: 'San Francisco',
        twitter_username: 'mojombo',
      });
      done();
    });
  });

  it('should dispatch loadUserDetails action on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(
      loadUserDetails({ username: 'mojombo' })
    );
  });

  it('should navigate back when goBack is called', () => {
    component.goBack();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
