
import {Lexer} from "./types/lexer.js"
import {Token} from "./types/token.js"
import {openLexer} from "./lexers/open-lexer.js"
import {atomLexer} from "./lexers/atom-lexer.js"
import {closeLexer} from "./lexers/close-lexer.js"

export const lexers: Lexer<Token.Any>[] = [
	openLexer,
	closeLexer,
	atomLexer,
]
