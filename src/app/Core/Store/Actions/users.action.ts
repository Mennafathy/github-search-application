import { createAction, props } from '@ngrx/store';

export const searchUsers = createAction(
  '[User] Search Users',
  props<{ query: string; page: number; perPage: number }>()
);

export const searchUsersSuccess = createAction(
  '[User] Search Users Success',
  props<{ users: any[] }>()
);

export const searchUsersFailure = createAction(
  '[User] Search Users Failure',
  props<{ error: string }>()
);
