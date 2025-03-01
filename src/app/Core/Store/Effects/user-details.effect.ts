import { GithubApiService } from './../../Sevices/github-api.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import {
  loadUserDetails,
  loadUserDetailsFailure,
  loadUserDetailsSuccess,
} from '../Actions/user-details.actions';

@Injectable()
export class UserDetailsEffects {
  constructor(
    private actions$: Actions,
    private _githubService: GithubApiService
  ) {}

  loadUserDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserDetails),
      mergeMap(({ username }) =>
        this._githubService.getUserDetails(username).pipe(
          map((user) => loadUserDetailsSuccess({ user })),
          catchError((error) =>
            of(loadUserDetailsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
