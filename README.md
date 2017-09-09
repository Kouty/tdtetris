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

The list will change with commits, always reflecting the current state of the code. It should short enough,
so remove completed tasks and everything that is no more relevant to the developing process.

## What is the first test?
```
$ git checkout tags/first_test
```
It's not easy to answer directly to this question. If you move from the first commit to the tag listed above, you will 
be able to read in the file todo.txt what I was thinking to get the answer to this question. Here a short version of it.

One way to start 