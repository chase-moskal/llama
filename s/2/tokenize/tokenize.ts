
import Token from "./token.js"
import Syntax from "./syntax.js"
import newAtomTracker from "./new-atom-tracker.js"
import newStringTracker from "./new-string-tracker.js"

export default function tokenize(input: string) {
	const characters = Array.from(input)
	const {length} = characters

	const tokens: Token.Any[] = []
	const string = newStringTracker(({value, trace}) => tokens.push({
		type: Syntax.String,
		trace,
		value,
	}))

	const atom = newAtomTracker(({value, trace}) => tokens.push({
		type: Syntax.Atom,
		trace,
		value,
	}))

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
			if (!saved) atom.add(character)
		}
	})

	const final = length - 1
	atom.end(final)
	string.terminate(final)
	return tokens
}
