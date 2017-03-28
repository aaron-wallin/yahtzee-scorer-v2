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
const firebase_service_1 = require("../services/firebase.service");
const router_1 = require("@angular/router");
let ChallengeDetailComponent = class ChallengeDetailComponent {
    constructor(_firebaseService, _routeParams) {
        this._firebaseService = _firebaseService;
        this._routeParams = _routeParams;
        this.pageTitle = 'New Game';
        this.challenge = new challenge_1.Challenge();
        this.errorWarningMessage = "";
        let id = this._routeParams.snapshot.params['id'];
        this.pageTitle = "Yahtzee Challenge " + id;
        this.challenge.challengeId = id;
    }
    ngOnInit() {
        this._firebaseService.getChallenge(this.challenge.challengeId).subscribe(c => this.challenge = this.loadChallenge(c), error => console.log("***ERROR ON ngOnInit ChallengeListComponent***:" + error));
    }
    loadChallenge(c) {
        var _challenge = new challenge_1.Challenge();
        _challenge = c;
        _challenge.gameArray = [];
        Object.keys(_challenge.games).forEach((id) => {
            var value = _challenge.games[id];
            _challenge.gameArray.push(value);
        });
        return _challenge;
    }
};
ChallengeDetailComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/home/challenge-detail.component.html',
        providers: [firebase_service_1.FirebaseService]
    }),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        router_1.ActivatedRoute])
], ChallengeDetailComponent);
exports.ChallengeDetailComponent = ChallengeDetailComponent;
//# sourceMappingURL=challenge-detail.component.js.map