
import {Lexer} from "../types/lexer.js"
import {Token} from "../types/token.js"
import {Syntax} from "../types/syntax.js"
import {makeTrace} from "./helpers/make-trace.js"

const regex = /^(\s*)(\))(.*)$/

export const closeLexer: Lexer<Token.Close> = (input, offsets) => {
	const result = input.match(regex)
	if (result) {
		const [, whitespace, content, remainder] = result
		return {
			content,
			remainder,
			token: {
				syntax: Syntax.Close,
				trace: makeTrace(offsets, whitespace, content),
			},
		}
	}
}
