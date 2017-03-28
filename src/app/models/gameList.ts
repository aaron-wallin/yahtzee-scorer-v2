import {Game} from './game';

export interface GameList {
    [gameId: string]: Game;
}
