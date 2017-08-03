describe('Karma, Jasmine and Typeascript conf', () => {
    it('should run this test', () => {
        expect(tautology()).toBe(true);
    });

    function tautology(): boolean {
        return true;
    }
});
