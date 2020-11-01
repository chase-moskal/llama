
import Token from "../types/token.js"
import Lexer from "../types/lexer.js"
import Syntax from "../types/syntax.js"
import TokenizeError from "../errors/tokenize-error.js"

export default function stringLexer(): Lexer<Token.String> {
	let active = false
	let start = 0
	let value = ""

	function reset() {
		active = false
		start = 0
		value = ""
	}

	function consider(character: string) {
		if (active) value += character
	}

	function process(character: string, index: number): Token.String[] {
		if (/"/.test(character)) {
			active = !active
			if (active) start = index
			else {
				const token: Token.String = {
					value,
					type: Syntax.String,
					trace: {start, end: index},
				}
				reset()
				return [token]
			}
		}
		else consider(character)
		return []
	}

	function terminate(final: number): Token.String[] {
		if (active) throw new TokenizeError({
			message: "unterminated string",
			trace: {start, end: final},
		})
		return []
	}

	return {
		process,
		terminate,
	}
}
