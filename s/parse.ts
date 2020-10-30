
import {tokenize} from "./internals/tokenize.js"
import {assemble} from "./internals/assemble.js"

export function parse(input: string) {
	const tokens = tokenize(input)
	return assemble(tokens)
}
