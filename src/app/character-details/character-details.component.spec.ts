import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CharacterDetailsComponent } from './character-details.component';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let cardElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDetailsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    cardElement = fixture.debugElement.query(By.css('div.card'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the card-element when the input is null', () => {
    component.characterDetails$ = null;
    fixture.detectChanges();
    expect(cardElement).toBeFalsy();
  });

  it('should display the card-element when the input is defined', () => {
    const luke = { name: 'Luke Skywalker' };
    component.characterDetails$ = of(luke);
    fixture.detectChanges();
    expect(cardElement).toBeDefined();
  });
});
