
import Token from "./token.js"

export default interface Lexer<T extends Token.Any> {
	lex(character: string, index: number): T[]
	terminate(final: number): T[]
}
