import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../Actions/users.action';

export interface UserState {
  users: any[];
  error: string | null;
}

const initialState: UserState = {
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.searchUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null,
  })),
  on(UserActions.searchUsersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
