import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CharacterComponent } from './character.component';
import { DebugElement } from '@angular/core';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let cardElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    cardElement = fixture.debugElement.query(By.css('div.card'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display the card-element when the input is null', () => {
    component.character = null;
    fixture.detectChanges();
    expect(cardElement).toBeFalsy();
  });

  it('should display the card-element when the input is defined with the correct headline', () => {
    component.character = { name: 'Luke Skywalker' };
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(cardElement).toBeDefined();
    expect(compiled.querySelector('h3').textContent).toContain('Luke Skywalker');
  });

  it('should call the button handler when button is clicked', async(() => {
    spyOn(component, 'clickOnDetails');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));
    fixture.whenStable().then(() => {
      expect(component.clickOnDetails).toHaveBeenCalled();
    });
  }));

  it('should emit an event when the button handler function is called', async(() => {
    component.character = { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1' };
    spyOn(component.loadDetails, 'emit');
    component.clickOnDetails();
    fixture.whenStable().then(() => {
      expect(component.loadDetails.emit).toHaveBeenCalled();
      expect(component.loadDetails.emit).toHaveBeenCalledWith(component.character.url);
    });
   }));
});
