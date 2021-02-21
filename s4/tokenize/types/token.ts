
import {Trace} from "./trace.js"
import {Syntax} from "./syntax.js"

export namespace Token {
	interface Base {
		syntax: Syntax
		trace: Trace
	}

	export interface Atom extends Base {
		syntax: Syntax.Atom
		value: string
	}

	export interface String extends Base {
		syntax: Syntax.String
		value: string
	}

	export interface Open extends Base {
		syntax: Syntax.Open
	}

	export interface Close extends Base {
		syntax: Syntax.Close
	}

	export type Any = (
		| String
		| Atom
		| Open
		| Close
	)
}
