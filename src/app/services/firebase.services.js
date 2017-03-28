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
var core_1 = require("angular2/core");
var Observable_1 = require("rxjs/Observable");
var http_1 = require("'@angular/http'");
var FirebaseService = (function () {
    function FirebaseService(_http) {
        this._http = _http;
        this._baseUrl = "https://yahtzeechallenge.firebaseio.com";
    }
    FirebaseService.prototype.setChallenge = function (challenge) {
        var body = JSON.stringify(challenge); //{firstname: firstName, lastName: lastName});
        return this._http.put('https://yahtzeechallenge.firebaseio.com/challenges/' + challenge.challengeId + '.json', body)
            .map(function (response) { return response.json(); });
    };
    FirebaseService.prototype.getChallenge = function (challengeId) {
        return this._http.get('https://yahtzeechallenge.firebaseio.com/challenges/' + challengeId + '/.json')
            .map(function (response) { return response.json(); });
    };
    FirebaseService.prototype.getChallenges = function () {
        var _this = this;
        return this._http.get(this._baseUrl + '/challenges.json')
            .map(function (response) { return _this.convertAllChallengesToArray(response); })
            .do(function (data) { return _this.writeJsonString(data); })
            .catch(this.handleError);
    };
    FirebaseService.prototype.getGame = function (challengeId, gameId) {
        var _this = this;
        return this._http.get('https://yahtzeechallenge.firebaseio.com/challenges/' + challengeId + '/games/' + gameId + '/.json')
            .map(function (response) { return response.json(); })
            .do(function (data) { return _this.writeJsonString(data); })
            .catch(this.handleError);
    };
    FirebaseService.prototype.saveSingleGame = function (game) {
        var body = JSON.stringify(game);
        console.log(body);
        return this._http.put('https://yahtzeechallenge.firebaseio.com/challenges/' + game.challengeId + '/games/' + game.gameId + '/.json', body)
            .map(function (response) { return response.json(); });
    };
    FirebaseService.prototype.convertAllChallengesToArray = function (response) {
        var data = response.json();
        var challengeArray = [];
        Object.keys(data).forEach(function (challengeId) {
            var value = data[challengeId];
            challengeArray.push(value);
        });
        return challengeArray;
    };
    FirebaseService.prototype.writeJsonString = function (data) {
        console.log("All: " + JSON.stringify(data));
    };
    FirebaseService.prototype.handleError = function (error) {
        console.error("***ERROR IN getChallenges***" + error);
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    return FirebaseService;
}());
FirebaseService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], FirebaseService);
exports.FirebaseService = FirebaseService;
var _a;
//# sourceMappingURL=firebase.services.js.map