describe('Playfield', function () {

  xit('should spawn tetrominoes', function () {
    const NUM_ROWS = 10;
    const playField = new PlayField(NUM_ROWS);

    const tetromino = {};
    playField.spawn(tetromino);

    const a = ()=>null;
    console.log(a);

    expect(tetromino.row).toBe(10);
  });

});