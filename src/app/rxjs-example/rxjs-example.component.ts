import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Subscription, interval, map, merge, take, tap } from 'rxjs';
import { LotrApiService, LotrCharacter, LotrCharacterDetails } from '../services/lotr-api.service';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-rxjs-example',
  imports: [MatCardModule, MatButtonModule, MatChipsModule],
  templateUrl: './rxjs-example.component.html',
  styleUrl: './rxjs-example.component.scss'
})
export class RxjsExampleComponent {
  results: string[] = [];
  characters: LotrCharacter[] = [];
  characterDetails: { [id: string]: LotrCharacterDetails } = {};

  private sub?: Subscription;

  private stream$ = merge(
    interval(1000).pipe(take(10), map(i => `1${i}`)), // trigger every second
    interval(2000).pipe(take(5), map(i => `2${i}`)),  // trigger every 2 seconds
    interval(3000).pipe(take(3), map(i => `3${i}`))   // trigger every 3 seconds
  ).pipe(
    tap((i) => {
      this.results.push(i);
      console.info(i)
    }))

  constructor(private apiService: LotrApiService) { }

  count() {
    this.sub?.unsubscribe();
    this.results = [];
    this.sub = this.stream$.subscribe();
  }

  hasDetails(id: string) {
    return id in this.characterDetails;
  }

  fetchCharacters() {
    this.apiService.fetchCharacters()
      .subscribe(results => this.characters = results);
  }

  fetchCharacterDetailsById(id: string) {
    this.apiService.fetchCharacterDetails(id)
      .subscribe(result => this.characterDetails[id] = result);
  }
}
