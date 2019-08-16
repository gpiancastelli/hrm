import { Data, Instr, Memory, ProgramState } from "./model"
import { readProgram } from "./parser"

class CPU {
    private memory: Memory[]
    private history: ProgramState[]

    constructor(memory: Memory[] = []) {
        this.memory = memory
        this.history = []
    }

    execute(instructions: Instr[], input: Data[]): Data[] {
        if (instructions.length === 0) {
            return []
        }

        let currentState: ProgramState = {
            input: input,
            output: [],
            memory: this.memory,
            register: undefined,
            counter: 0
        }
        this.history.push(currentState)
        
        do {
            currentState = instructions[currentState.counter].execute(currentState)
            this.history.push(currentState)
        } while (currentState.counter != -1 && currentState.counter < instructions.length)
        
        return currentState.output
    }
}

export default function runProgram(path: string, input: Data[], memory: Memory[] = []): Data[] {
    const program = readProgram(path)
    const cpu = new CPU(memory)
    return cpu.execute(program, input)
}