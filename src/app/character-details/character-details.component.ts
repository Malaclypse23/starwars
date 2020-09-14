import { Component, Input } from '@angular/core';

import { Character } from '../character.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent {

  @Input()
  characterDetails$: Observable<Character>;

}
