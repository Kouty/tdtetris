import {ScoreCalculator} from '../src/scoreCalculator';

describe('ScoreCalculator', () => {
    let calculator;

    beforeEach(function() {
        calculator = new ScoreCalculator();
    });

    it('should add 1 to score for each lock', () => {
        calculator.addPointsForLock();

        expect(calculator.score).toBe(1);
    });

    it('should add 5 for 1 row cleared', () => {
        calculator.addPointsForClear(1);

        expect(calculator.score).toBe(5);
    });

    it('should add 5 + 10 for 2 rows cleared', () => {
        calculator.addPointsForClear(2);

        expect(calculator.score).toBe(15);
    });

    it('should add the sum of cleared rows * 5 points for N rows cleared', () => {
        calculator.addPointsForClear(4);

        expect(calculator.score).toBe(50);
    });

});
