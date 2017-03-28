import {Routes} from '@angular/router'
import {NewChallengeComponent} from './home/new-challenge.component'
import {ChallengesComponent} from './home/challenges.component'
import {ChallengeDetailComponent} from './home/challenge-detail.component'
import {SingleGameDetail} from './home/single-game-detail.component'
import {ChallengeListComponent} from './home/challenge-list.component'


export const appRoutes:Routes = [
    {path: 'challenges', component: ChallengeListComponent},
    {path: 'challenges/new', component: NewChallengeComponent},
    {path: 'challenges/:id', component: ChallengeDetailComponent},
    {path: 'challenges/:cid/games/:gid',  component: SingleGameDetail},
    {path: '', redirectTo: 'challenges', pathMatch: 'full' },
]