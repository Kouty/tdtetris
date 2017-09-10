# Test Driven Developed Tetris
**WORK IN PROGRESS**

When I first approached to TDD, I thought it was wonderful, but I had doubts it could actually be used at work.
I thought that writing tests for simple tasks, like the examples used in TDD tutorials, was easy,
but when actually dealing with the complexity of a Web Application, tests would have become difficult, time consuming,
and therefore failing their purpose: make code simple!

So, what if I wrote a whole (HTML) Tetris using TDD? Here it is: **Test Driven Tetris!**

## TDD rules
Uncle Bob states:
1. You are not allowed to write any production code unless it is to make a failing unit test pass.
2. You are not allowed to write any more of a unit test than is sufficient to fail; and compilation failures are failures.
3. You are not allowed to write any more production code than is sufficient to pass the one failing unit te

## Behavioural Driven Development
Although it is not completely true, I want to assert:

*Since the word Test in TDD confuses people, it should be substituted with the word __Behaviour__*.

Writing tests first, we actually answer to this question:
*if the code had already been written, how do I expect it to be used?* In other words, in a test we assert how that
piece of code should behave and what is the easiest way to use it.

This way of thinking has guided me throughout the whole development process, so each test represents a behaviour I
thought was needed to fulfill the Tetris requirements.

## Before we start
Clone the code from this repository, and checkout the tag related to the section of this tutorial you are reading.
```
$ git clone https://github.com/Kouty/tdtetris.git
```

## ToDo list
In order to TDD an application, a todo list is required. It is just a place where to write next steps, doubts and
whatever you think it is useful to be noted down.

The list will change with commits, always reflecting the current state of the code. It should be short enough,
so remove completed tasks and everything that is no more relevant to the developing process.

By moving across commits of the _**todo.txt**_ file, you can read what I was thinking and developing at the commit moment.

## What is the first test?
```
$ git checkout tags/first_test_red
```
It's not easy to answer directly to this question. If you move from the first commit to the tag _first_test_red_,
you will be able to read in the file todo.txt what I was thinking to get the answer to this question.
Here a short version of it.

Before jumping to the code, I decided to study the Tetris game in more details. I found this site useful:
[http://tetris.wikia.com/wiki/Gameplay_overview](http://tetris.wikia.com/wiki/Gameplay_overview).
From there I extracted some useful words:
- Tetromino
- Playfield
- Rotation
- Piece preview
- Row clear
- Locking

In addition, I decided to start with a reduced version of the game:

**One Column Tetris**.

This means that there is just the `I` tetromino (the line), there is no rotation, the tetromino spawns at the top of the
playfield, it can be moved downwards, and when it reaches te bottom, it gets cleared, and a new tetromino spawns.

Now it is easier to decide where to start. Since Tetris starts by spawning a tetromino in the playfiled, 
I begun writing a test about spawning the `I` tetromino inside the playfield.

```JavaScript
describe('Playfield', function () {

  it('should spawn tetrominoes', function () {
    const NUM_ROWS = 10;
    const playField = new PlayField(NUM_ROWS);

    const tetromino = {};
    playField.spawn(tetromino);

    expect(tetromino.row).toBe(10);
  });

});
```

As you can see, it's a simple test, but it has many implications:
- It states there is a PlayFiled class that needs the number of rows (since we have only 1 column)
- It states that this PlayField class should have a method spawn(...) that takes a tetromino and gives it a position
- It asserts that this position is 10, the number of rows of the playfield.

There are 2 weird things here: normally the row should be 9, since usually 0 based coordinates is used, 
and that the tetromino gets modified, which is unnecessary. In fact, I changed my mind! See the next paragraph.

## First test green
```
$ git checkout tags/first_test_green
```
```typescript
it('should spawn tetrominoes', function () {
	const NUM_ROWS = 10;
	const playField = new TdTetris.PlayField(NUM_ROWS);

	const tetromino: TdTetris.Tetromino = {};
	playField.spawn(tetromino);

	expect(playField.tetronimo.row).toBe(NUM_ROWS - 1);
});
```
In the meanwhile, I decided to switch from JavaScript to TypeScript, since I always wanted to try it.
Don't pay attention to the namespace TdTetris, it will vanish soon.

OK, in this test we can see that it is the PlayFiled class that owns the placed tetromino, and it can be set through the method
`playField.spawn(tetromino);`. This means we have 2 concepts:
- Tetromino, which will represent the 7 tetrominoes
- PlacedTetromino, which is the spawned tetromino and moves inside the PlayField.

## Tetromino
```
$ git checkout tags/tetromino_bounding_box
```
The previous test allowed me to write some code (remember: _You are not allowed to write any production code unless it is to make a failing unit test pass_). But it didn't allow me to write any code about the tetromino (apart from an ITetromino empty interface).
So it is time to write tests to implement the `I` tetromino code.

Now another bit of analysis is needed. How can I represent a tetromino? The answer came from this page: [http://tetris.wikia.com/wiki/SRS?file=SRS-pieces.png](http://tetris.wikia.com/wiki/SRS?file=SRS-pieces.png).
Each tetromino is inside a containing square, and spawning means put the square in the top middle of the PlayField.
Time to remove the 1 column restriction, and focus on the Tetromino and PlacedTetromino classes.

`tetromino.spec.ts`
```typescript
describe('Tetromino', function () {

    describe('I', function () {
        it('should have a containing rectangle', function () {
            const tetrominoI = Tetrominoes.I.create();

            expect(tetrominoI.width).toBe(4);
            expect(tetrominoI.height).toBe(4);
        });

        it('should fill the 3rd row', function () {
            const tetrominoI = Tetrominoes.I.create();

            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    const shouldFill = row === 2;
                    expect(shouldFill).toBe(tetrominoI.fills(row, col));
                }
            }
        });
    });

});
```
OK, the Tetromino class has a width, a height and a method 'tetrominoI.fills(row, col)' to tell if the square inside
its mask is filled.

`playfield.spec.ts`
```typescript
import {PlayField} from '../src/playfield';

describe('Playfield', function () {
    let oneSquareTetromino;

    beforeEach(function () {
        oneSquareTetromino = {width: 1, height: 1, fills: () => false};
    });

    it('should spawn a tetromino at the top row and in the middle column, rounding left', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);

        playField.spawn(oneSquareTetromino);

        expect(playField.tetromino.row).toBe(NUM_ROWS - 1);
        expect(playField.tetromino.col).toBe(2);
    });

    it('should consider tetromino width when spawning it', function () {
        const NUM_ROWS = 20;
        const playField = new PlayField(NUM_ROWS, 5);
        const threeSquaresTetromino = Object.assign({}, oneSquareTetromino, {width: 3});

        playField.spawn(threeSquaresTetromino);

        expect(playField.tetromino.col).toBe(1);
    });
});
```
Now the `playField.spawn(...);` has to consider the bounding box of the tetromino.
You may have noticed that I didn't use the `I` tetromino implementations.
Instead I created a `oneSquareTetromino` fake implementation of the ITetromino interface.
When you test a behaviour, all the dependencies should be fake, and tests must be simple.
The oneSquareTetromino accomplish both.
