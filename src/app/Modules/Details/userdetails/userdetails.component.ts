import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserDetails } from '../../../Core/Interfaces/userDetails.interface';
import { Observable } from 'rxjs';
import { loadUserDetails } from '../../../Core/Store/Actions/user-details.actions';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
})
export class UserdetailsComponent implements OnInit {
  users$: Observable<UserDetails>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userData!: UserDetails;

  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
    private router: Router
  ) {
    this.users$ = this.store.pipe(select((state) => state.userDetails.user));
    this.loading$ = this.store.pipe(
      select((state) => state.userDetails.loading)
    );
    this.error$ = this.store.pipe(select((state) => state.userDetails.error));
  }
  ngOnInit() {
    this.users$.subscribe((user) => {
      this.userData = user;
    });
    this.route.paramMap.subscribe((params) => {
      const username = params.get('username');
      if (username) {
        this.store.dispatch(loadUserDetails({ username }));
      }
    });
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
