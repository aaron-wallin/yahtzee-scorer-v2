import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Challenge} from '../models/challenge';
import {Game} from '../models/game';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class FirebaseService {

    private _baseUrl = 'https://yahtzeechallenge.firebaseio.com';

    constructor(private _http: Http, private _af: AngularFireDatabase) {}

    setChallenge(challenge: Challenge) {
        const body = JSON.stringify(challenge);
        const jsonObj = JSON.parse(body);
        this._af.object('challenges/' + challenge.challengeId).set(jsonObj);
    }

    getChallenge(challengeId: string): Observable<Challenge> {
        return this._af.object('challenges/' + challengeId);
    }

    getChallenges(): Observable<Challenge[]> {
        return this._af.list('challenges');
    }

    getGame(challengeId: string, gameId: string): Observable<Game> {
        return this._af.object('challenges/' + challengeId  + '/games/' + gameId);
    }

    saveSingleGame(game: Game) {
        this._af.object('/challenges/' + game.challengeId + '/games/' + game.gameId).set(game);
    }

    convertAllChallengesToArray(response: any): Challenge[] {
        const data = <{ string, Challenge; }>response.json();
        const challengeArray = [];
           Object.keys(data).forEach(
             challengeId => {
                const value = data[challengeId];
                challengeArray.push(value);
            });

            return challengeArray;
    }

    writeJsonString(data: any) {
        console.log('All: ' + JSON.stringify(data));
    }

    private handleError(error: Response) {
        console.error("***ERROR IN getChallenges***" + error);
        return Observable.throw(error.json().error || 'Server error');
    }
}