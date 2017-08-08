describe('Karma, Jasmine and Typescript conf', () => {
    it('should run this test', () => {
        expect(tautology()).toBe(true);
    });

    function tautology(): boolean {
        return true;
    }
});
