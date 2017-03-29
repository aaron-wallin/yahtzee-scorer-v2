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
import { AuthService} from './user/auth.service';

import {appRoutes} from './routes';

import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

const myFirebaseConfig = {
  apiKey: 'AIzaSyDMHOTkcH6poblzQfi8SpreHMLm52Hqpl4',
  authDomain: 'yahtzeechallenge.firebaseapp.com',
  databaseURL: 'https://yahtzeechallenge.firebaseio.com',
  storageBucket: 'yahtzeechallenge.appspot.com',
  messagingSenderId: '342189699352'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({

  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes) ,
    AngularFireModule.initializeApp(myFirebaseConfig, myFirebaseAuthConfig)],
  declarations: [
    AppComponent,
    NewChallengeComponent,
    ChallengesComponent,
    ChallengeDetailComponent,
    SingleGameDetail,
    ChallengeListComponent ],
  providers: [
    AuthService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
