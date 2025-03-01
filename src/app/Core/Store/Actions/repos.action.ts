import { createAction, props } from '@ngrx/store';

export const loadRepos = createAction(
  '[Repo] Load Repos',
  props<{ page: number; perPage: number }>()
);

export const loadReposSuccess = createAction(
  '[Repo] Load Repos Success',
  props<{ repos: any[]; totalCount: number; uniqueUserNames: string[] }>()
);
export const loadReposFailure = createAction(
  '[Repo] Load Repos Failure',
  props<{ error: string }>()
);
