
import {Token} from "./types/token.js"
import {lexers} from "./lexers.js"
import {TraceOffsets} from "./types/trace-offsets.js"

export function tokenize(
			input: string,
			offsets: TraceOffsets = {
				label: "script",
				offset: 0,
			},
		): Token.Any[] {

	let tokens: Token.Any[] = []
	let remainder: string

	for (const lexer of lexers) {
		const result = lexer(input, offsets)
		if (result) {
			tokens.push(result.token)
			remainder = result.remainder
			offsets.offset = result.token.trace.end + 1
			break
		}
	}

	if (remainder)
		tokens.push(...tokenize(remainder, offsets))

	return tokens
}
