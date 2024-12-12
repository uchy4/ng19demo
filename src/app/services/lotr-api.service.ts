import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';

type Url = string; // string for now but its own type for better specificity

interface LotrCategory {
  id: string;
  name: string;
}

interface LotrCharacterBase<T> extends LotrCategory {
  weapons: string[];
  species: T;
  race: T;
  group: T;
}

export type LotrCharacter = LotrCharacterBase<Url>;
export type LotrCharacterDetails = LotrCharacterBase<LotrCategory>;

@Injectable({
  providedIn: 'root'
})
export class LotrApiService {
  static readonly BASE_URL = 'https://lotrapi.co/api/v1/';

  constructor(private http: HttpClient) { }

  fetchCharacters(): Observable<LotrCharacter[]> {
    return this.http.get<{results: LotrCharacter[]}>(LotrApiService.BASE_URL + 'characters').pipe(map(r => r.results))
  }

  fetchCharacterDetails(id: string): Observable<LotrCharacterDetails> {
    return this.http.get<LotrCharacter>(LotrApiService.BASE_URL + 'characters/' + id)
      .pipe(
        switchMap(character => {
          return forkJoin([
            of(character),
            this.http.get<LotrCategory>(character.race),
            this.http.get<LotrCategory>(character.species),
            this.http.get<LotrCategory>(character.group)
          ])
        }),
        map(([character, race, species, group]): LotrCharacterDetails => ({
          ...character,
          race,
          species,
          group
        }))
      )
  }
}
