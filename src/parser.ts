import { readFileSync } from 'fs'
import { CopyFrom, CopyTo, Inbox, Instr, Jump, Outbox } from './model'

export function readProgram(path: string): Instr[] {
    const instructions: Instr[] = []
    const labels = new Map<string, number>()

    const text = readFileSync(path, 'utf-8')
    const lines = text.split('\n')
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        // comments
        if (line.startsWith('-- ') || line.length === 0) {
            continue
        }
        // labels
        const labelMatch = line.match(/^(\w+)\s*:$/)
        if (labelMatch != null) {
            labels.set(labelMatch[1], instructions.length)
            continue
        }
        // actual instructions
        const [name, ...args] = line.split(/\s+/)
        switch (name) {
            case 'INBOX':
                instructions.push(new Inbox())
                break
            case 'OUTBOX':
                instructions.push(new Outbox())
                break
            case 'JUMP':
                const label = args[0]
                if (!labels.has(label)) {
                    labels.set(label, -1)
                }
                instructions.push(new Jump(label, labels))
                break
            case 'COPYFROM':
                instructions.push(new CopyFrom(Number(args[0])))
                break
            case 'COPYTO':
                instructions.push(new CopyTo(Number(args[0])))
                break
            default:
                throw `Unknown instruction: ${name}`
        }
    }

    // double-check on labels
    labels.forEach((value, key) => {
        if (value < 0) {
            throw `Unknown label: ${key}`
        }
    })

    return instructions
}