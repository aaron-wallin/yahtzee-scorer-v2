"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Observable_1 = require("rxjs/Observable");
const http_1 = require("@angular/http");
let FirebaseService = class FirebaseService {
    constructor(_http) {
        this._http = _http;
        this._baseUrl = "https://yahtzeechallenge.firebaseio.com";
    }
    setChallenge(challenge) {
        const body = JSON.stringify(challenge); //{firstname: firstName, lastName: lastName});
        return this._http.put('https://yahtzeechallenge.firebaseio.com/challenges/' + challenge.challengeId + '.json', body)
            .map(response => response.json());
    }
    getChallenge(challengeId) {
        return this._http.get('https://yahtzeechallenge.firebaseio.com/challenges/' + challengeId + '/.json')
            .map((response) => { return response.json(); });
    }
    getChallenges() {
        return this._http.get(this._baseUrl + '/challenges.json')
            .map((response) => { return this.convertAllChallengesToArray(response); })
            .do(data => this.writeJsonString(data))
            .catch(this.handleError);
    }
    getGame(challengeId, gameId) {
        return this._http.get('https://yahtzeechallenge.firebaseio.com/challenges/' + challengeId + '/games/' + gameId + '/.json')
            .map((response) => { return response.json(); })
            .do(data => this.writeJsonString(data))
            .catch(this.handleError);
    }
    saveSingleGame(game) {
        const body = JSON.stringify(game);
        console.log(body);
        return this._http.put('https://yahtzeechallenge.firebaseio.com/challenges/' + game.challengeId + '/games/' + game.gameId + '/.json', body)
            .map(response => response.json());
    }
    convertAllChallengesToArray(response) {
        var data = response.json();
        var challengeArray = [];
        Object.keys(data).forEach(challengeId => {
            var value = data[challengeId];
            challengeArray.push(value);
        });
        return challengeArray;
    }
    writeJsonString(data) {
        console.log("All: " + JSON.stringify(data));
    }
    handleError(error) {
        console.error("***ERROR IN getChallenges***" + error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    }
};
FirebaseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], FirebaseService);
exports.FirebaseService = FirebaseService;
//# sourceMappingURL=firebase.service.js.map