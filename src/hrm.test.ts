import runProgram from "./hrm";

test('runs the first program', () => {
    const output = runProgram('res/01.txt', [4, 7, 4])
    expect(output).toStrictEqual([4, 7, 4])
})

test('runs the second program', () => {
    const output = runProgram('res/02.txt', ['A', 'U', 'T', 'O', 'E', 'X', 'E', 'C'])
    expect(output).toStrictEqual(['A', 'U', 'T', 'O', 'E', 'X', 'E', 'C'])
})

test('runs the third program', () => {
    const output = runProgram(
        'res/03.txt',
        [-99, -99, -99, -99],
        ['U', 'G', 'X', 'G', 'B', 'E']
    )
    expect(output).toStrictEqual(['B', 'U', 'G'])
})

test('runs the fourth program', () => {
    const output = runProgram(
        'res/04.txt',
        [1, 8, 'Q', 'O', 4, 5],
        [undefined, undefined, undefined]
    )
    expect(output).toStrictEqual([8, 1, 'O', 'Q', 5, 4])
})

// TODO runs the fifth program