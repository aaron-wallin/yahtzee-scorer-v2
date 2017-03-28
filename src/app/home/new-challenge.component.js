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
const challenge_1 = require("../models/challenge");
const game_1 = require("../models/game");
const firebase_service_1 = require("../services/firebase.service");
const router_1 = require("@angular/router");
let NewChallengeComponent = class NewChallengeComponent {
    constructor(_firebaseService, _router) {
        this._firebaseService = _firebaseService;
        this._router = _router;
        this.pageTitle = 'New Game';
        this.challenge = new challenge_1.Challenge();
        this.errorWarningMessage = "";
    }
    ngOnInit() {
        this.challenge.challengeId = this.generateNewChallengeId();
        this.challenge.challengeDate = (new Date()).toLocaleDateString();
    }
    createChallenge() {
        this.errorWarningMessage = "";
        if (this.challenge.players.length == 0) {
            this.errorWarningMessage = "There are no players in the list.";
            return;
        }
        if (this.challenge.players.length > 0) {
            for (let p of this.challenge.players) {
                if (p.length == 0) {
                    this.errorWarningMessage = "There's at least one player in the list without a name.";
                    return;
                }
            }
        }
        this.challenge.numberOfGames = 3;
        for (let p of this.challenge.players) {
            for (var _i = 1; _i <= this.challenge.numberOfGames; _i++) {
                var g = new game_1.Game(this.challenge.challengeId);
                g.playerName = p;
                g.gameNumber = _i;
                g.gameId = g.playerName.toLowerCase().replace(" ", "") + g.gameNumber.toString();
                this.challenge.games[g.gameId] = g;
            }
        }
        this._firebaseService.setChallenge(this.challenge).subscribe(c => { this.challenge = c; this.routeToDetail(); }, error => console.log(error));
    }
    routeToDetail() {
        this._router.navigate(['/challenges', { id: this.challenge.challengeId }]);
    }
    generateNewChallengeId() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 7; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
};
NewChallengeComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/home/new-challenge.component.html',
        providers: [firebase_service_1.FirebaseService]
    }),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        router_1.Router])
], NewChallengeComponent);
exports.NewChallengeComponent = NewChallengeComponent;
//# sourceMappingURL=new-challenge.component.js.map