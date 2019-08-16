This is a TypeScript interpreter of Human Resource Machine programs.

[Human Resource Machine](https://tomorrowcorporation.com/humanresourcemachine) is a game by Tomorrow Corporation, where your task is to move some boxes from an input conveyor to an output conveyor, sometimes using the floor to help with processing input boxes. You complete tasks by writing small programs in an assembler-like language, which you are allowed to copy and paste outside the game. This interpreter runs those programs.

Currently, the interpreter only supports the following instructions: `INBOX`, `OUTBOX`, `JUMP`, `COPYFROM`, `COPYTO`. Also, the parser is able to recognize syntactically correct programs using those instructions, but could definitely use some improvements in error detection.

This is also my first TypeScript project, so things are probably a bit messy here and there, and a lot could be improved. For example:

* tests are in the same folder as the actual source code
* there is no linter
* some properties (e.g. `main`) in `package.json` should probably be removed

Language-wise, I have yet to finish reading the [handbook](https://www.typescriptlang.org/docs/handbook/basic-types.html), but for the few things I know the code seems to hold together reasonably. This is actually my second design: the first one was based on representing instructions as functions in a class, but I had some issues trying to dynamically invoke those functions while keeping some definitions with parameters and some without. Then, I decided to rewrite the thing using objects, and it seemed a better solution. Still, I'm not satisfied with `jump` instructions sharing the label map of the program.