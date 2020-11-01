
import Syntax from "./syntax.js"

namespace Token {
	export interface Base {
		type: Syntax
		trace: {
			start: number
			end: number
		}
	}

	export interface String extends Base {value: string}
	export interface Atom extends Base {value: string}
	export interface Open extends Base {value: string}
	export interface Close extends Base {value: string}

	export type Any =
		| String
		| Atom
		| Open
		| Close
}

export default Token
