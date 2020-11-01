
import Token from "./types/token.js"
import atomLexer from "./lexers/atom-lexer.js"
import stringLexer from "./lexers/string-lexer.js"

export default function tokenize(input: string) {
	const characters = Array.from(input)
	const lexers = [stringLexer(), atomLexer()]
	const tokens: Token.Any[] = []

	characters.forEach((character, index) => {
		for (const lexer of lexers)
			tokens.push(...lexer.process(character, index))
	})

	for (const lexer of lexers)
		tokens.push(...lexer.terminate(characters.length -1))

	return tokens
}
