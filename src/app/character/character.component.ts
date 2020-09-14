import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Character } from './../character.model';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent {

  @Input()
  character: Character;

  @Output()
  loadDetails: EventEmitter<string> = new EventEmitter<string>();

  clickOnDetails(): void {
    this.loadDetails.emit(this.character.url);
  }

}
