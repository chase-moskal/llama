
import {Token} from "./types/token.js"
import {lexers} from "./lexers.js"
import {TraceOffsets} from "./types/trace-offsets.js"

export function tokenize(
		input: string,
		offsets: TraceOffsets = {
			label: "script",
			offset: 0,
			offsetLine: 0,
		},
	): Token.Any[] {

	let tokens: Token.Any[] = []
	let remainder: string

	for (const lexer of lexers) {
		const result = lexer(input, offsets)
		if (result) {
			tokens.push(result.token)
			remainder = result.remainder
			offsets.offset += result.content.length
			offsets.offsetLine += (result.content.match(/\n/g) ?? []).length
			break
		}
	}

	if (remainder)
		tokens.push(...tokenize(remainder, offsets))

	return tokens
}
