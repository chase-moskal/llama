
import Token from "./types/token.js"
import Lexer from "./types/lexer.js"

export default function tokenize(input: string): Token.Any[] {

	let tokens: Token.Any[] = []
	const lexers: Lexer[] = []

	for (const lexer of lexers) {
		const result = lexer.regex.exec(input)
		if (result) {
			const {length} = result[0]
			const remainder = input.slice(length)
		}
	}

	return
}
