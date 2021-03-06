import {Game} from './game';
import {GameList} from './gameList';

export class Challenge {
    challengeDate: string;
    challengeId: string;
    gameArray: Game[];
    games: { [gameId: string]: Game; };
    players: string[];
    numberOfGames: number;

    constructor() {
        this.players = [];
        this.games = {};
        this.gameArray = [];
    }

    addPlayer(name: string): void {
        if (name.length > 0) {
            this.players.push(name);
        }
    }

    public castGamesToArray(): Game[] {
        this.gameArray = [];

        Object.keys(this.games).forEach(
            challengeId => {
            const value = this.games[challengeId];
            this.gameArray.push(value);
        });

        return this.gameArray;
    }
}
