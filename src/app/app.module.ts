import './rxjs-extensions';
import { NgModule, Inject, OnInit } from '@angular/core';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NewChallengeComponent } from './home/new-challenge.component';
import { ChallengesComponent } from './home/challenges.component';
import { ChallengeDetailComponent } from './home/challenge-detail.component';
import { SingleGameDetailComponent } from './home/single-game-detail.component';
import { ChallengeListComponent } from './home/challenge-list.component';
import { AuthService } from './user/auth.service';
import { appRoutes } from './routes';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AuthGuard } from './authguard.component';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

const myFirebaseConfig = {
  apiKey: 'AIzaSyDMHOTkcH6poblzQfi8SpreHMLm52Hqpl4',
  authDomain: 'yahtzeechallenge.firebaseapp.com',
  databaseURL: 'https://yahtzeechallenge.firebaseio.com',
  storageBucket: 'yahtzeechallenge.appspot.com',
  messagingSenderId: '342189699352'
};

/*
const myFirebaseAuthConfig = {
  provider: firebase.auth.EmailAuthProvider,
  method: firebase.auth.EmailAuthProvider.PROVIDER_ID
};
*/

@NgModule( {
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes) ,
    AngularFireModule.initializeApp(myFirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
    ],
  declarations: [
    AppComponent,
    NewChallengeComponent,
    ChallengesComponent,
    ChallengeDetailComponent,
    SingleGameDetailComponent,
    ChallengeListComponent ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule implements OnInit {
  constructor(@Inject(DOCUMENT) private document) { }

  ngOnInit(): void {
    const bases = this.document.getElementsByTagName('base');

    if (bases.length > 0) {
      bases[0].setAttribute('href', environment.baseHref);
    }
  }
}

