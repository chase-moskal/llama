
import Trace from "../trace.js"

export default class TokenizeError extends Error {
		constructor({message, trace}: {
			message: string
			trace: Trace
		}) {
		super(`error (${trace.start}:${trace.end}) ${message}`)
	}
}
