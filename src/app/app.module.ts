import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CharacterComponent } from './character/character.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CharacterDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
