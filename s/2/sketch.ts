
export enum Toke {
	String,
	Atom,
	Open,
	Close,
}

export interface Trace {
	start: number
	end: number
}

export namespace Tokens {
	export interface Base {
		type: Toke
		trace: {
			start: number
			end: number
		}
	}
	export interface String extends Base {value: string}
	export interface Atom extends Base {value: string}
	export interface Open extends Base {value: string}
	export interface Close extends Base {value: string}
}

export type Token = Tokens.Base
	| Tokens.String
	| Tokens.Atom
	| Tokens.Open
	| Tokens.Close

// [string, comment, atom, open, close]

export class CodeError extends Error {
		constructor({message, trace}: {
			message: string
			trace: Trace
		}) {
		super(`error (${trace.start}:${trace.end}) ${message}`)
	}
}

function newAtomTracker(
		push: (data: {value: string; trace: Trace}) => void
	) {
	let start = 0
	let atom = ""

	function setStart(index: number) {
		start = index
	}

	function add(char: string) {
		atom += char
	}

	function end(index: number) {
		if (atom.length > 0) push({
			trace: {start, end: index},
			value: atom,
		})
		atom = ""
	}

	return {setStart, add, end}
}

export function tokenize(input: string) {
	const characters = Array.from(input)
	const {length} = characters

	const tokens: Token[] = []
	const string = newStringTracker(({value, trace}) => tokens.push({
		type: Toke.String,
		trace,
		value,
	}))

	const atom = newAtomTracker(({value, trace}) => tokens.push({
		type: Toke.Atom,
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

function newStringTracker(
		push: (data: {value: string; trace: Trace}) => void
	) {
	let active = false
	let start = 0
	let value = ""

	function reset() {
		active = false
		start = 0
		value = ""
	}

	function end(index: number) {
		push({value, trace: {start, end: index}})
		reset()
	}

	function cap(index: number) {
		active = !active
		if (active) start = index
		else end(index)
	}

	function consider(character: string) {
		if (active) value += character
		return active
	}

	function terminate(index: number) {
		if (active) throw new CodeError({
			message: "unterminated string",
			trace: {start, end: index},
		})
	}

	return {end, cap, consider, terminate}
}

