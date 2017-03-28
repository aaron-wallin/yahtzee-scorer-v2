"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Challenge {
    constructor() {
        this.players = [];
        this.games = {};
        this.gameArray = [];
    }
    addPlayer(name) {
        if (name.length > 0) {
            this.players.push(name);
        }
    }
    castGamesToArray() {
        this.gameArray = [];
        Object.keys(this.games).forEach(challengeId => {
            var value = this.games[challengeId];
            this.gameArray.push(value);
        });
        return this;
    }
}
exports.Challenge = Challenge;
//# sourceMappingURL=challenge.js.map