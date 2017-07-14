import {Component, OnInit} from '@angular/core';
import {Challenge} from '../models/challenge';
import {Game} from '../models/game';
import {FirebaseService} from '../services/firebase.service';

@Component({
    templateUrl: '../home/challenge-list.component.html'
})

export class ChallengeListComponent implements OnInit {
    pageTitle = 'Yahtzee Challenges';
    challenges: Challenge[] = [];

    constructor(private _firebaseService: FirebaseService) {}

    ngOnInit(): void {
        this._firebaseService.getChallenges().subscribe(
                c => this.challenges = c,
                error => console.log('***ERROR ON ngOnInit ChallengeListComponent***:' + error));
    }
}