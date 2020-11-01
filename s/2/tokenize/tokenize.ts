
import Token from "./types/token.js"
import lexingGroup from "./lexing-group.js"
import atomLexer from "./lexers/atom-lexer.js"
import stringLexer from "./lexers/string-lexer.js"

export default function tokenize(input: string): Token.Any[] {
	const characters = Array.from(input)
	const lexers = lexingGroup(stringLexer(), atomLexer())
	return [
		...characters.map(lexers.lex).flat(),
		...lexers.terminate(characters.length - 1),
	]
}
