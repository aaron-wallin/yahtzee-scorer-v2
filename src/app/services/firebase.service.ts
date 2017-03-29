import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from '@angular/http';
import {Challenge} from '../models/challenge';
import {Game} from '../models/game';

@Injectable()
export class FirebaseService {

    private _baseUrl = 'https://yahtzeechallenge.firebaseio.com';

    constructor(private _http: Http) {}

    setChallenge(challenge: Challenge){
        const body = JSON.stringify(challenge);//{firstname: firstName, lastName: lastName});
        return this._http.put('https://yahtzeechallenge.firebaseio.com/challenges/' + challenge.challengeId + '.json', body)
            .map(response => response.json());
    }

    getChallenge(challengeId: string): Observable<Challenge> {
        return this._http.get('https://yahtzeechallenge.firebaseio.com/challenges/' + challengeId  + '/.json')
            .map((response: Response) => { return <Challenge>response.json()});
    }

    getChallenges(): Observable<Challenge[]> {
        return this._http.get(this._baseUrl + '/challenges.json')
                        .map((response: Response) => { return this.convertAllChallengesToArray(response)})
                        .do(data => this.writeJsonString(data))
                        .catch(this.handleError);
    }

    getGame(challengeId: string, gameId: string): Observable<Game> {
        return this._http.get('https://yahtzeechallenge.firebaseio.com/challenges/' + challengeId  + '/games/' + gameId + '/.json')
                        .map((response: Response) => { return <Game>response.json()})
                        .do(data => this.writeJsonString(data))
                        .catch(this.handleError);
    }

    saveSingleGame(game: Game){
        const body = JSON.stringify(game);
        console.log(body);
        return this._http.put('https://yahtzeechallenge.firebaseio.com/challenges/' +
                                game.challengeId + '/games/' + game.gameId + '/.json', body)
                                .map(response => response.json());
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