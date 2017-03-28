/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works! weeeeee!';
}*/

import {Component} from '@angular/core';
import {NgModule} from '@angular/core'
import {Http} from '@angular/http';
import {RouterLink} from '@angular/router';

import {NewChallengeComponent} from './home/new-challenge.component';
import {ChallengeListComponent} from './home/challenge-list.component';
import {ChallengeDetailComponent} from './home/challenge-detail.component';
import {ChallengesComponent} from './home/challenges.component';

import {FirebaseService} from './services/firebase.service';

import {RouterModule} from '@angular/router'
import {appRoutes} from './routes';

@Component({
    selector: 'app-root',
    template: `
    <div class='container-fluid'>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['challenges']">Home</a></li>
                    <li><a [routerLink]="['challenges/new']">New Challenge</a></li>
                </ul>

            </div>
        </nav>  
        <div class='container-fluid'>
            <router-outlet></router-outlet>
        </div>    
    </div>
    `,
    providers: [FirebaseService]
})

export class AppComponent {
    pageTitle: string = 'Yahtzee Challenge';
}
