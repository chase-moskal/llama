
import Trace from "./trace.js"
import TokenizeError from "./errors/code-error.js"

export default function newStringTracker(
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
		if (active) throw new TokenizeError({
			message: "unterminated string",
			trace: {start, end: index},
		})
	}

	return {end, cap, consider, terminate}
}
