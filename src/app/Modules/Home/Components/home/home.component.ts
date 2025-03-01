import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';

import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RepoState } from '../../../../Core/Store/Reducer/repos.reducer';
import { Observable, tap } from 'rxjs';
import { loadRepos } from '../../../../Core/Store/Actions/repos.action';
import { UserState } from '../../../../Core/Store/Reducer/users.reducer';
import * as UserActions from '../../../../Core/Store/Actions/users.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    FormsModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    MultiSelectModule,
    InputTextModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  repositories$: Observable<any>;
  loading$: Observable<boolean>;
  repositories: any[] = [];
  users$!: Observable<any[]>;
  currentPage = 1;
  perPage = 10;
  query: string = '';
  constructor(
    private store: Store<{ repos: RepoState; users: UserState }>,
    private router: Router
  ) {
    this.repositories$ = this.store.select((state) => state.repos.repos);
    this.loading$ = this.store.select((state) => state.repos.loading);
    this.users$ = this.store.select((state) => state.users.users);
  }

  ngOnInit() {
    this.repositories$.subscribe((repos) => {
      this.repositories = [...repos];
    });
    this.loadData();
  }

  loadData() {
    this.store.dispatch(
      loadRepos({ page: this.currentPage, perPage: this.perPage })
    );
  }
  onSearch(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    if (this.query.length) {
      this.store.dispatch(
        UserActions.searchUsers({ query: this.query, page: 1, perPage: 10 })
      );
    }
  }
  goToUserDetails(repo: any) {
    this.router.navigate(['/user', repo.data.username]);
  }
  onPageChange(event: any) {
    this.currentPage = event.first / event.rows + 1;
    this.perPage = event.rows;
    this.repositories.length
      ? this.loadData()
      : this.store.dispatch(
          UserActions.searchUsers({
            query: this.query,
            page: this.currentPage,
            perPage: event.rows,
          })
        );
  }
}
