export class ScoreCalculator {
    private pScore: number;

    constructor() {
        this.pScore = 0;
    }

    public addPointsForLock() {
        this.pScore++;
    }

    public addPointsForClear(numRowsCleared: number) {
        this.pScore += (numRowsCleared * (numRowsCleared + 1) / 2) * 5;
    }

    get score() {
        return this.pScore;
    }
}
