import { Component, OnInit, Input } from '@angular/core';
import { Challenge } from '../models/challenge';
import { Game } from '../models/game';
import { UpperSection } from '../models/uppersection';
import { LowerSection } from '../models/lowersection';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

@Component({
    selector: 'yz-singlegame',
    templateUrl: '../home/single-game-detail.component.html',
    providers: [FirebaseService],
    styleUrls: ['../shared/singlegamedetail.component.css']
})

export class SingleGameDetail implements OnInit {
    pageTitle: string = 'Game';
    @Input() game: Game = new Game("");
    errorWarningMessage: string = "";
    @Input() challengeId: string;
    @Input() gameId: string;
    saveInProgress: boolean;

    constructor(private _firebaseService: FirebaseService,
        private _routeParams: ActivatedRoute) {

        this.challengeId = this._routeParams.snapshot.params['cid'];
        this.gameId = this._routeParams.snapshot.params['gid'];

        this.pageTitle = this.game.challengeId + " / " + this.game.playerName + " [" + this.game.gameNumber + "]";
    }

    OnInit(): void {
        this.pageTitle = this.game.challengeId + " / " + this.game.playerName + " [" + this.game.gameNumber + "]";
    }

    saveGame(): void {
        this._firebaseService.saveSingleGame(this.game).subscribe(
            c => { let x = c; },
            error => console.log(error)
        );
    }

    calcUpperTotal(): void {
        this.game.upperSection.bonus = 0;
        var subTotal = +this.game.upperSection.ones + +this.game.upperSection.twos + +this.game.upperSection.threes +
            +this.game.upperSection.fours + +this.game.upperSection.fives + +this.game.upperSection.sixes;

        if (subTotal >= 63) {
            this.game.upperSection.bonus = 35;
        }

        this.game.upperSection.total = +subTotal + +this.game.upperSection.bonus;
        this.game.grandTotal = +this.game.upperSection.total + +this.game.lowerSection.total;
        this.internalSaveGame();
    }

    calcLowerTotal(): void {
        var subTotal = +this.game.lowerSection.threeOfaKind + +this.game.lowerSection.fourOfaKind + +this.game.lowerSection.fullHouse +
            +this.game.lowerSection.smallStraight + +this.game.lowerSection.largeStraight + +this.game.lowerSection.yahtzee +
            +this.game.lowerSection.chance + +this.game.lowerSection.bonusYahtzee;

        this.game.lowerSection.total = +subTotal;
        this.game.grandTotal = +this.game.upperSection.total + +this.game.lowerSection.total;
        this.internalSaveGame();
    }

    internalSaveGame(): void {
        if (this.saveInProgress) return;
        this.saveInProgress = true;
        Observable.interval(2000).take(1)._do(() => { this.saveGame(); this.saveInProgress = false; }).subscribe();
    }

    ngOnInit(): void {
       // if (this.game.gameId === "") {
            this._firebaseService.getGame(this.challengeId, this.gameId).subscribe(
                g => {
                    this.game = g;
                    this.pageTitle = this.game.challengeId + " / " + this.game.playerName + " [" + this.game.gameNumber + "]";
                },
                error => console.log("***ERROR ON ngOnInit Single-Game_Detail***:" + error)
            );
        //}

        this.pageTitle = this.game.challengeId + " / " + this.game.playerName + " [" + this.game.gameNumber + "]";
    }
}
