
import Token from "../types/token.js"
import Lexer from "../types/lexer.js"
import Syntax from "../types/syntax.js"
import TokenizeError from "../errors/tokenize-error.js"

export default function stringLexer(): Lexer<Token.String> {
	let active = false
	let start = 0
	let value = ""
	return {

		lex(character: string, index: number): Token.String[] {
			if (/"/.test(character)) {
				active = !active
				if (active) start = index
				else {
					const token: Token.String = {
						value,
						type: Syntax.String,
						trace: {start, end: index},
					}
					active = false
					start = 0
					value = ""
					return [token]
				}
			}
			else if (active) value += character
			return []
		},

		terminate(final: number): Token.String[] {
			if (active) throw new TokenizeError({
				message: "unterminated string",
				trace: {start, end: final},
			})
			return []
		},
	}
}
