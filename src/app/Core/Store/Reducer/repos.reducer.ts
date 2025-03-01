import { createReducer, on } from '@ngrx/store';
import * as RepoActions from '../Actions/repos.action';

export interface RepoState {
  repos: any[];
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: RepoState = {
  repos: [],
  totalCount: 0,
  loading: false,
  error: null,
};

export const repoReducer = createReducer(
  initialState,
  on(RepoActions.loadRepos, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RepoActions.loadReposSuccess, (state, { repos, totalCount }) => ({
    ...state,
    repos,
    totalCount,
    loading: false,
  })),
  on(RepoActions.loadReposFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
