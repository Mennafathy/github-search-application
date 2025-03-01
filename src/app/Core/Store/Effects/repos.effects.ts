import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as RepoActions from '../Actions/repos.action';
import { GithubApiService } from '../../Sevices/github-api.service';

@Injectable()
export class RepoEffects {
  loadRepos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RepoActions.loadRepos),
      switchMap(({ page, perPage }) =>
        this.githubService.getRepositoriesForAllUsers(page, perPage).pipe(
          map(({ repos, totalCount, uniqueUserNames }) =>
            RepoActions.loadReposSuccess({ repos, totalCount, uniqueUserNames })
          ),
          catchError((error) =>
            of(RepoActions.loadReposFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private githubService: GithubApiService
  ) {}
}
