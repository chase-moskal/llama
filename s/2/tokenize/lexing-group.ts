
import Token from "./types/token.js"
import Lexer from "./types/lexer.js"

export default function lexingGroup(
		...lexers: Lexer<Token.Any>[]
	): Lexer<Token.Any> {
	return {
		lex(character: string, index: number) {
			return lexers.map(lexer => lexer.lex(character, index)).flat()
		},
		terminate(index: number) {
			return lexers.map(lexer => lexer.terminate(index)).flat()
		},
	}
}
