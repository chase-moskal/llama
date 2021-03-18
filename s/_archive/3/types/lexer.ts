
import Token from "./token.js"

export default interface Lexer {
	regex: RegExp
	tokenize: (input: string) => {
		token: Token.Any
		remainder: string
	}
}
