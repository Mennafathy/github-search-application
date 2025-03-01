import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GithubApiService } from '../../Sevices/github-api.service';
import * as UserActions from '../Actions/users.action';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private githubService: GithubApiService
  ) {}

  searchUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUsers),
      debounceTime(300),
      switchMap(({ query, page, perPage }) =>
        this.githubService.searchUsers(query, page, perPage).pipe(
          map((users) => UserActions.searchUsersSuccess({ users })),
          catchError((error) =>
            of(UserActions.searchUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
