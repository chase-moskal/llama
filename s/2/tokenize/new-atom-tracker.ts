
import Trace from "./trace.js"

export default function newAtomTracker(
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
