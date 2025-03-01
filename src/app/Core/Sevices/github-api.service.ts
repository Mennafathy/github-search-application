import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserDetails } from '../Interfaces/userDetails.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  private usersUrl = 'https://api.github.com/users';
  private token = 'your_Token';

  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<string[]> {
    return this._httpClient
      .get<any[]>(this.usersUrl, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      })
      .pipe(map((users) => users.map((user) => user.login)));
  }

  getRepositoriesForUser(
    userName: string,
    page: number,
    perPage: number
  ): Observable<{ repos: any[]; totalCount: number }> {
    const url = `${this.usersUrl}/${userName}/repos?sort=created&page=${page}&per_page=${perPage}`;
    return this._httpClient
      .get<any[]>(url, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
      })
      .pipe(
        map((repos) => ({
          repos: repos.map((repo) => ({
            username: repo.owner.login,
            repositories_count: repo.stargazers_count,
            followers: repo.watchers_count,
            bio: repo.description,
            avatar_url: repo.owner.avatar_url,
          })),
          totalCount: repos.length,
        }))
      );
  }

  getRepositoriesForAllUsers(
    page: number,
    perPage: number
  ): Observable<{
    repos: any[];
    totalCount: number;
    uniqueUserNames: string[];
  }> {
    return this.getUsers().pipe(
      switchMap((userNames) =>
        forkJoin(
          userNames.map((userName) =>
            this.getRepositoriesForUser(userName, page, perPage)
          )
        )
      ),
      map((results) => {
        const repos = results.flatMap((result) => result.repos);
        const totalCount = results.reduce(
          (sum, result) => sum + result.totalCount,
          0
        );

        const uniqueUserNames = [
          ...new Set(repos.map((repo) => repo.username)),
        ];

        return { repos, totalCount, uniqueUserNames };
      })
    );
  }
  searchUsers(
    query: string,
    page: number = 1,
    perPage: number = 10
  ): Observable<any[]> {
    return this._httpClient
      .get<any>(`${this.usersUrl}?q=${query}&page=${page}&per_page=${perPage}`)
      .pipe(map((response) => response.items || []));
  }
  getUserDetails(username: string): Observable<UserDetails> {
    return this._httpClient.get<UserDetails>(`${this.usersUrl}/${username}`);
  }
}
