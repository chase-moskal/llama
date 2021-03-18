
import {Trace} from "../../types/trace.js"
import {TraceOffsets} from "../../types/trace-offsets.js"

export function makeTrace(
			offsets: TraceOffsets,
			whitespace: string,
			content: string,
		): Trace {

	const start = offsets.offset + whitespace.length

	return {
		label: offsets.label,
		start,
		end: start + content.length - 1,
	}
}
