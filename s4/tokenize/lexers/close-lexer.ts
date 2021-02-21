
import {Lexer} from "../types/lexer.js"
import {Token} from "../types/token.js"
import {Syntax} from "../types/syntax.js"

export const closeLexer: Lexer<Token.Open> = (input, offsets) => {
	if (input[0] === ")") {
		return {
			content: input[0],
			remainder: input.slice(1),
			token: {
				syntax: Syntax.Open,
				trace: {
					label: offsets.label,
					start: offsets.offset,
					end: offsets.offset + 1,
					line: offsets.offsetLine,
					column: 0,
				}
			},
		}
	}
}
