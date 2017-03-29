import {Component, OnInit} from '@angular/core';
import {Challenge} from '../models/challenge';
import {Game} from '../models/game';
import {FirebaseService} from '../services/firebase.service';
import {Routes, ActivatedRoute, Router} from '@angular/router';
import {SingleGameDetail} from '../home/single-game-detail.component';

@Component({
    templateUrl: '../home/challenge-detail.component.html',
    providers: [FirebaseService]
})

export class ChallengeDetailComponent implements OnInit {
    pageTitle = 'New Game';
    challenge: Challenge = new Challenge();
    createChallengeResponse: string;
    errorWarningMessage = "";

    constructor(private _firebaseService: FirebaseService,
                private _routeParams: ActivatedRoute) {
            const id = this._routeParams.snapshot.params['id'];
            this.pageTitle = 'Yahtzee Challenge ' + id;
            this.challenge.challengeId = id;
    }

    ngOnInit(): void {
       this._firebaseService.getChallenge(this.challenge.challengeId).subscribe(
                c => this.challenge = this.loadChallenge(c),
                error => console.log("***ERROR ON ngOnInit ChallengeListComponent***:" + error)
                );
    }

    private loadChallenge(c: Challenge): Challenge {
        let _challenge = new Challenge();
        _challenge = c;
        _challenge.gameArray = [];
        Object.keys(_challenge.games).forEach(
             (id) => {
                 const value = _challenge.games[id];
                 _challenge.gameArray.push(value);
            });

        return _challenge;
    }
}
