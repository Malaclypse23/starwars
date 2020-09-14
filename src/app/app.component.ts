import { Component, OnInit } from '@angular/core';

import { Character } from './character.model';
import { Observable } from 'rxjs';
import { StarWarsApiService } from './star-wars-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Star Wars API Aufgabe';
  characters$: Observable<Character[]>;
  characterDetails$: Observable<Character>;
  randomNumber = 1;

  constructor(private starWarsApiService: StarWarsApiService) {
    this.randomNumber = this.randomNumberBetween(1, 8);
  }

  ngOnInit(): void {
    this.characters$ = this.starWarsApiService.getCharacters(this.randomNumber);
  }

  getDetails(url: string): void {
    this.characterDetails$ = this.starWarsApiService.getCharacterDetails(url);
  }

  randomNumberBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
