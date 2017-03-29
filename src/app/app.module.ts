/*
import './rxjs-extensions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/

import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NewChallengeComponent } from './home/new-challenge.component';
import { ChallengesComponent } from './home/challenges.component';
import { ChallengeDetailComponent } from './home/challenge-detail.component';
import { SingleGameDetail } from './home/single-game-detail.component';
import { ChallengeListComponent } from './home/challenge-list.component';

import {appRoutes} from './routes';

@NgModule({

  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes) ],
  declarations: [
    AppComponent,
    NewChallengeComponent,
    ChallengesComponent,
    ChallengeDetailComponent,
    SingleGameDetail,
    ChallengeListComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
