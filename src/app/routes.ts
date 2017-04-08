import {Routes} from '@angular/router';
import {NewChallengeComponent} from './home/new-challenge.component';
import {ChallengesComponent} from './home/challenges.component';
import {ChallengeDetailComponent} from './home/challenge-detail.component';
import {SingleGameDetailComponent} from './home/single-game-detail.component';
import {ChallengeListComponent} from './home/challenge-list.component';
import {AuthGuard} from './authguard.component';

export const appRoutes: Routes = [
    {path: 'challenges', component: ChallengeListComponent, canActivate: [AuthGuard]},
    {path: 'challenges/new', component: NewChallengeComponent, canActivate: [AuthGuard]},
    {path: 'challenges/:id', component: ChallengeDetailComponent, canActivate: [AuthGuard]},
    {path: 'challenges/:cid/games/:gid',  component: SingleGameDetailComponent, canActivate: [AuthGuard]},
    {path: 'user', loadChildren: 'app/user/user.module#UserModule'},
    {path: '', redirectTo: 'challenges', pathMatch: 'full', canActivate: [AuthGuard] },
]