describe('Playfield', function () {

  it('should spawn tetrominoes', function () {
    const NUM_ROWS = 10;
    const playField = new PlayField(NUM_ROWS);

    const tetromino = {};
    playField.spawn(tetromino);

    expect(tetromino.row).toBe(10);
  });

});