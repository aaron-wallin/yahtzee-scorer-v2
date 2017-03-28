import {UpperSection} from './upperSection';
import {LowerSection} from './lowerSection';

export class Game {
    challengeId: string;
    gameNumber: number;
    playerName: string;
    upperSection: UpperSection = {};
    lowerSection: LowerSection = {};
    gameId: string;
    ones: number;
    twos: number;
    grandTotal?: number;

    constructor(challengeId: string) {
        this.challengeId = challengeId;
        this.upperSection = {ones:0, twos: 0, threes: 0, fours: 0, fives: 0, sixes: 0, total: 0, bonus: 0};
        this.lowerSection = {threeOfaKind: 0, fourOfaKind: 0, fullHouse: 0, smallStraight: 0, largeStraight: 0, yahtzee: 0, bonusYahtzee: 0, chance: 0, total: 0};
        this.gameId = "";
    }

    //validate = (): boolean => {
    //    return (this.checkString(this.BlogName) && this.checkString(this.CopyrightHolder) && this.checkString(this.NavBarTitle) && _.isNumber(this.CacheTimeOut) && !_.isNull(this.MarkdownExtra) && !_.isNull(this.MarkdownSanitize) && !_.isNull(this.RatingActive));
    //} 

    calculateUpperSectionTotal = (): void => {
        this.upperSection.bonus = 0;
        var subTotal = this.upperSection.ones + this.upperSection.twos + this.upperSection.threes + this.upperSection.fours + this.upperSection.fives + this.upperSection.sixes;

        if(subTotal >= 63)
        {
            this.upperSection.bonus = 35;
        }

        this.upperSection.total = subTotal + this.upperSection.bonus;
    }
}
