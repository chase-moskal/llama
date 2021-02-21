
import {Token} from "./token.js"
import {TraceOffsets} from "./trace-offsets.js"

export type Lexer<xToken extends Token.Any> = (
	(input: string, offsets: TraceOffsets) => undefined | {
		token: xToken
		content: string
		remainder: string
	}
)
