
import {tokenize} from "./internals/tokenize.js"
import {assemble} from "./internals/assemble.js"

export function parse(input: string) {
	return assemble(tokenize(input))
}
