import {Component} from '@angular/core';
import {NgModule} from '@angular/core';
import {Http} from '@angular/http';
import {RouterLink} from '@angular/router';

import {NewChallengeComponent} from './home/new-challenge.component';
import {ChallengeListComponent} from './home/challenge-list.component';
import {ChallengeDetailComponent} from './home/challenge-detail.component';
import {ChallengesComponent} from './home/challenges.component';

import {FirebaseService} from './services/firebase.service';

import {RouterModule} from '@angular/router';
import {appRoutes} from './routes';
import {AuthService} from './user/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./shared/singlegamedetail.component.css'],
    providers: [FirebaseService]
})

export class AppComponent {
    pageTitle = 'Yahtzee Challenge';
    constructor(public authService: AuthService) { }

    logout() {
        this.authService.logoutUser();
    }
}
