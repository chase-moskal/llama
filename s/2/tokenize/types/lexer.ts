
import Token from "./token.js"

export default interface Lexer<T extends Token.Any> {
	process(character: string, index: number): T[]
	terminate(final: number): T[]
}
