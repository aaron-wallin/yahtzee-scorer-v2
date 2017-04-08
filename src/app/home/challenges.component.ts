import {Component} from '@angular/core';
import {Http} from '@angular/http';
import {Router, ROUTER_CONFIGURATION, Routes, RouterModule} from '@angular/router';

import {NewChallengeComponent} from './new-challenge.component';
import {ChallengeListComponent} from './challenge-list.component';
import {ChallengeDetailComponent} from './challenge-detail.component';
import {SingleGameDetailComponent} from './single-game-detail.component';

@Component({
    selector: 'challenges-root',
    template: `<router-outlet></router-outlet>`,
})

export class ChallengesComponent {}
