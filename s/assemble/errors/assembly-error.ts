
import {Trace} from "../../tokenize/types/trace.js"

export class AssemblyError extends Error {
	constructor(trace: Trace, message: string) {
		super(`[${trace.label}:${trace.start}-${trace.end}] ${message}`)
	}
}
