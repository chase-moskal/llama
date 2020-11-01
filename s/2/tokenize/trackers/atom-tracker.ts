
import Trace from "../types/trace.js"

export default function atomTracker(
		push: (data: {value: string; trace: Trace}) => void
	) {
	let start = 0
	let atom = ""

	function add(char: string, index: number) {
		if (atom.length === 0) start = index
		atom += char
	}

	function end(index: number) {
		if (atom.length > 0) push({
			trace: {start, end: index},
			value: atom,
		})
		atom = ""
	}

	return {add, end}
}
