
import Token from "./types/token.js"
import Syntax from "./types/syntax.js"
import prepareTrackers from "./trackers/prepare-trackers.js"

/**
 *
 *          (abc "my (expression)" (x y)) // comment
 * atom      ==^                    ^ ^
 * comment                                =========^
 * string        ================^
 * list     ----------------------------^
 *                                 ----^
 *
 * one stateful tokenizing machine for each syntax
 * - each machine can push tokens as they appear
 */

export default function tokenize(input: string) {
	const characters = Array.from(input)

	const tokens: Token.Any[] = []
	const {string, atom} = prepareTrackers(tokens)

	characters.forEach((character, index) => {
		if (/"/.test(character)) {
			atom.end(index)
			string.cap(index)
		}
		else if (/\s/.test(character)) {
			atom.end(index)
			string.consider(character)
		}
		// else if (/\(/.test(character)) {}
		// else if (/\)/.test(character)) {}
		else {
			const saved = string.consider(character)
			if (!saved) atom.add(character, index)
		}
	})

	const final = characters.length - 1
	atom.end(final)
	string.terminate(final)

	return tokens
}
