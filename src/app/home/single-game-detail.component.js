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
const game_1 = require("../models/game");
const firebase_service_1 = require("../services/firebase.service");
const router_1 = require("@angular/router");
const Observable_1 = require("rxjs/Observable");
let SingleGameDetail = class SingleGameDetail {
    constructor(_firebaseService, _routeParams) {
        this._firebaseService = _firebaseService;
        this._routeParams = _routeParams;
        this.pageTitle = 'Game';
        this.game = new game_1.Game("");
        this.errorWarningMessage = "";
        this.challengeId = this._routeParams.snapshot.params['cid'];
        this.gameId = this._routeParams.snapshot.params['gid'];
        this.pageTitle = "Yahtzee Challenge: " + this.challengeId + " Game: " + this.gameId;
    }
    OnInit() {
        this.pageTitle = "Yahtzee Challenge: " + this.challengeId + " Game: " + this.gameId;
    }
    saveGame() {
        this._firebaseService.saveSingleGame(this.game).subscribe(c => { let x = c; }, error => console.log(error));
    }
    calcUpperTotal() {
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
    calcLowerTotal() {
        var subTotal = +this.game.lowerSection.threeOfaKind + +this.game.lowerSection.fourOfaKind + +this.game.lowerSection.fullHouse +
            +this.game.lowerSection.smallStraight + +this.game.lowerSection.largeStraight + +this.game.lowerSection.yahtzee +
            +this.game.lowerSection.chance + +this.game.lowerSection.bonusYahtzee;
        this.game.lowerSection.total = +subTotal;
        this.game.grandTotal = +this.game.upperSection.total + +this.game.lowerSection.total;
        this.internalSaveGame();
    }
    internalSaveGame() {
        if (this.saveInProgress)
            return;
        this.saveInProgress = true;
        Observable_1.Observable.interval(2000).take(1)._do(() => { this.saveGame(); this.saveInProgress = false; }).subscribe();
    }
    ngOnInit() {
        if (this.game.gameId === "") {
            this._firebaseService.getGame(this.challengeId, this.gameId).subscribe(g => {
                this.game = g;
            }, error => console.log("***ERROR ON ngOnInit Single-Game_Detail***:" + error));
        }
        this.pageTitle = "Yahtzee Challenge: " + this.challengeId + " Game: " + this.gameId;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", game_1.Game)
], SingleGameDetail.prototype, "game", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SingleGameDetail.prototype, "challengeId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SingleGameDetail.prototype, "gameId", void 0);
SingleGameDetail = __decorate([
    core_1.Component({
        selector: 'yz-singlegame',
        templateUrl: 'app/home/single-game-detail.component.html',
        providers: [firebase_service_1.FirebaseService],
    }),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
        router_1.ActivatedRoute])
], SingleGameDetail);
exports.SingleGameDetail = SingleGameDetail;
//# sourceMappingURL=single-game-detail.component.js.map