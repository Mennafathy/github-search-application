import { createAction, props } from '@ngrx/store';
import { UserDetails } from '../../Interfaces/userDetails.interface';

export const loadUserDetails = createAction(
  '[User] Load User Details',
  props<{ username: string }>()
);

export const loadUserDetailsSuccess = createAction(
  '[User] Load User Details Success',
  props<{ user: UserDetails }>()
);

export const loadUserDetailsFailure = createAction(
  '[User] Load User Details Failure',
  props<{ error: string }>()
);
