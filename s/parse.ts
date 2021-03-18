
import {assemble} from "./assemble/assemble.js"
import {tokenize} from "./tokenize/tokenize.js"

export function parse(input: string) {
	return assemble(tokenize(input))
}
