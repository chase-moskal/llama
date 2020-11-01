
import {Suite, assert} from "cynic"

import Token from "./tokenize/types/token.js"
import Syntax from "./tokenize/types/syntax.js"
import tokenize from "./tokenize/tokenize.js"

export default <Suite> {
	"tokenize": {
		"empty string returns empty": async() => {
			const tokens = tokenize(``)
			return true
				&& assert(Array.isArray(tokens), "result is array")
				&& assert(tokens.length === 0, "zero tokens")
		},
		"whitespace returns empty": async() => {
			return true
				&& assert(tokenize(" ").length === 0, "space isn't token")
				&& assert(tokenize("\t \r\n").length === 0, "tabs and newlines aren't tokens")
				&& assert(tokenize(`\t \r\n`).length === 0, "backtick newlines aren't tokens")
		},
		"symbols": async() => {
			const tokens = tokenize(`a`)
			return true
				&& assert(tokens.length === 1, "one token")
		},
		"strings": async() => {
			const tokens = <Token.String[]>tokenize(`"hello"`)
			assert(tokens[0].type === Syntax.String, "token is string")
			assert(tokens[0].value === "hello", "value is 'hello'")
			return true
		},
		// "differentiate strings and comments": async() => {
		// 	const a = tokenize(`"example"`)
		// 	const b = tokenize(`// example`)
		// 	const c = tokenize(`"example" // example`)
		// 	assert(a[0].type === Toke.String, "a: string")
		// 	assert(b.length === 0, "comments do not appear")
		// 	assert(c[0].type === Toke.String && c[1].type === Toke.Comment, "c: string comment")
		// 	return true
		// },
		// "extract pairs": async() => {
		// 	const a = tokenize(`(a ((b) c))`)
		// 	return true
		// 		// && assert(tokenize(`(a b c)`).pairs.length === 1, "one pair")
		// 		// && assert(tokenize(`(a (b) c)`).pairs.length === 2, "two pair")
		// 		&& assert(a.pairs.length === 3, "three pair")
		// 		&& assert(a.pairs[0][0] === 0 && a.pairs[0][1] === 8, "first pair indices")
		// 		// && assert(a.pairs[1][0] === 0 && a.pairs[1][1] === 8, "second pair indices")
		// },
	},
}
