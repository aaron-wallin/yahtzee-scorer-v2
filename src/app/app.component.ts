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
    template: `
    <div class='container-fluid'>

        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                
                    <a class='navbar-brand'>{{pageTitle}}</a>
                

                <div class='collapse navbar-collapse'>
                    <ul class='nav navbar-nav'>
                        <li><a [routerLink]="['challenges']">Home</a></li>
                        <li><a [routerLink]="['challenges/new']">New Challenge</a></li>
                    </ul>

                    <div class="navbar-header navbar-right">
                        <ul class="nav navbar-nav">
                          <li>
                            <a *ngIf="!authService.isAuthenticated()" [routerLink]="['user/login']">Login</a>
                            <div>                                
                                <a *ngIf="authService.isAuthenticated()">{{authService.currentUser.firstName}}</a>
                                <button *ngIf="authService.isAuthenticated()" (click)="logout()">Logout</button>
                            </div>
                          </li>
                        </ul>
                    </div>
                </div>

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
    pageTitle = 'Yahtzee Challenge';
    constructor(public authService: AuthService) { }

    logout() {
        this.authService.logoutUser();
    }
}
