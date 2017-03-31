import {Component, OnInit} from '@angular/core';
import {Challenge} from '../models/challenge';
import {Game} from '../models/game';
import {FirebaseService} from '../services/firebase.service';
import { Router} from '@angular/router';

@Component({
    templateUrl: '../home/new-challenge.component.html',
    providers: [FirebaseService]
})

export class NewChallengeComponent implements OnInit {
    pageTitle: string = 'New Game';
    challenge: Challenge = new Challenge();
    createChallengeResponse: string;
    errorWarningMessage: string = "";
    
    constructor(private _firebaseService: FirebaseService,
                private _router: Router) {
                    
                }

    ngOnInit(): void {
        this.challenge.challengeId = this.generateNewChallengeId();
        this.challenge.challengeDate = (new Date()).toLocaleDateString();
    }

    createChallenge(): void {
        this.errorWarningMessage = '';

        if(this.challenge.players.length == 0) {
            this.errorWarningMessage = 'There are no players in the list.';
            return;
        }

        if (this.challenge.players.length > 0) {
            for (const p of this.challenge.players) {
                if (p.length == 0) {
                    this.errorWarningMessage = 'There\'s at least one player in the list without a name.';
                    return;
                }
            }
        }

        this.challenge.numberOfGames = 3;

        for (let p of this.challenge.players) {
            for (let _i = 1; _i <= this.challenge.numberOfGames; _i++) {
                let g = new Game(this.challenge.challengeId);
                g.playerName = p;
                g.gameNumber = _i;
                g.gameId = g.playerName.toLowerCase().replace(' ', '') + g.gameNumber.toString()
                this.challenge.games[g.gameId] = g;
            }
        }

        this._firebaseService.setChallenge(this.challenge);
        /* .subscribe(
            c => { this.challenge = c; this.routeToDetail(); },
            error => console.log(error)

        );*/
    }

    routeToDetail(): void {
        this._router.navigate(['/challenges',{ id: this.challenge.challengeId }]);
    }

    generateNewChallengeId(): string {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 7; i++ ) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
}