import { createReducer, on } from '@ngrx/store';
import { UserDetails } from '../../Interfaces/userDetails.interface';
import {
  loadUserDetails,
  loadUserDetailsFailure,
  loadUserDetailsSuccess,
} from '../Actions/user-details.actions';

export interface UserDetailsState {
  user: UserDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserDetailsState = {
  user: null,
  loading: false,
  error: null,
};

export const userDetailsReducer = createReducer(
  initialState,
  on(loadUserDetails, (state) => ({ ...state, loading: true, error: null })),
  on(loadUserDetailsSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(loadUserDetailsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
