export { Data, Memory, ProgramState, Instr, Inbox, Outbox, Jump, JumpZ, CopyFrom, CopyTo }

type Data = number | string

type Memory = Data | undefined

type ProgramState = {
    input: Data[]
    output: Data[]
    memory: Memory[]
    register: Data | undefined
    counter: number
}

interface Instr {
    execute: (state: ProgramState) => ProgramState
}

class Inbox implements Instr {
    execute(state: ProgramState): ProgramState {
        if (state.input.length === 0) {
            return {
                input: state.input.slice(0),
                output: state.output.slice(0),
                memory: state.memory.slice(0),
                register: state.register,
                counter: -1
            }
        }
        return {
            input: state.input.slice(1),
            output: state.output.slice(0),
            memory: state.memory.slice(0),
            register: state.input[0],
            counter: state.counter + 1
        }
    }
}

class Outbox implements Instr {
    execute(state: ProgramState): ProgramState {
        if (state.register == undefined) {
            throw 'Nothing to output'
        }
        return {
            input: state.input.slice(0),
            output: state.output.concat(state.register),
            memory: state.memory.slice(0),
            register: undefined,
            counter: state.counter + 1
        }
    }
}

class Jump implements Instr {
    private label: string
    private labelMap: Map<string, number>

    constructor(label: string, labelMap: Map<string, number>) {
        this.label = label
        this.labelMap = labelMap
    }

    execute(state: ProgramState): ProgramState {
        const counter = this.labelMap.get(this.label)
        return {
            input: state.input.slice(0),
            output: state.output.slice(0),
            memory: state.memory.slice(0),
            register: state.register,
            counter: counter != undefined ? counter : -1
        }
    }
}

class JumpZ implements Instr {
    private label: string
    private labelMap: Map<string, number>

    constructor(label: string, labelMap: Map<string, number>) {
        this.label = label
        this.labelMap = labelMap
    }

    execute(state: ProgramState): ProgramState {
        const counter = Number(state.register === 0) ? this.labelMap.get(this.label) : state.counter + 1
        return {
            input: state.input.slice(0),
            output: state.output.slice(0),
            memory: state.memory.slice(0),
            register: state.register,
            counter: counter != undefined ? counter : -1
        }
    }
}

class CopyFrom implements Instr {
    private index: number

    constructor(index: number) {
        this.index = index;
    }

    execute(state: ProgramState): ProgramState {
        if (this.index >= state.memory.length) {
            throw `Illegal memory address: ${this.index}`
        }
        const value = state.memory[this.index]
        if (value == undefined) {
            throw 'No value to copy from memory'
        }
        return {
            input: state.input.slice(0),
            output: state.output.slice(0),
            memory: state.memory.slice(0),
            register: value,
            counter: state.counter + 1
        }
    }
}

class CopyTo implements Instr {
    private index: number

    constructor(index: number) {
        this.index = index;
    }

    execute(state: ProgramState): ProgramState {
        if (this.index >= state.memory.length) {
            throw `Illegal memory address: ${this.index}`
        }
        if (state.register == undefined) {
            throw 'No value to copy into memory'
        }
        const memory = state.memory.slice(0)
        memory[this.index] = state.register
        return {
            input: state.input.slice(0),
            output: state.output.slice(0),
            memory: memory,
            register: state.register,
            counter: state.counter + 1
        }
    }
}