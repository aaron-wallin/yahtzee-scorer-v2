import {Game} from './game';
import {GameList} from './gameList';

export class Challenge {
    challengeDate: string;
    challengeId: string;
    gameArray: Game[];
    games: {[gameId: string]: Game;};
    players: string[];
    numberOfGames: number;

    constructor() {
        this.players = [];
        this.games = {};
        this.gameArray = [];
    }

    addPlayer(name: string) : void {
        if(name.length > 0) {
            this.players.push(name);
        }
    }

    castGamesToArray(): Challenge {
        this.gameArray = [];

        Object.keys(this.games).forEach(
            challengeId => {
            var value = this.games[challengeId];
            this.gameArray.push(value);
        });

        return this;
    }
}
