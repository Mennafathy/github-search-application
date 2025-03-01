import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-index',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './base-index.component.html',
  styleUrl: './base-index.component.css',
})
export class BaseIndexComponent {}
