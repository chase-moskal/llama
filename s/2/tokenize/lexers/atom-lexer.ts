
import Token from "../types/token.js"
import Lexer from "../types/lexer.js"
import Syntax from "../types/syntax.js"

export default function atomLexer(): Lexer<Token.Atom> {
	let start = 0
	let atom = ""

	function add(character: string, index: number) {
		if (atom.length === 0) start = index
		atom += character
	}

	function end(index: number): Token.Atom[] {
		if (atom.length > 0) {
			const token: Token.Atom = {
				value: atom,
				type: Syntax.Atom,
				trace: {start, end: index},
			}
			atom = ""
			return [token]
		}
		return []
	}

	function process(character: string, index: number) {
		if (/\s/.test(character)) end(index)
		else add(character, index)
		return []
	}

	return {
		process,
		terminate: end,
	}
}
