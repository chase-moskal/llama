
import {Axiom} from "./axiom.js"
import {Trace} from "../../tokenize/types/trace.js"

export namespace Data {
	interface Base {
		axiom: Axiom
		trace: Trace
	}

	export interface Symbol extends Base {
		axiom: Axiom.Symbol
		value: string
	}

	export interface String extends Base {
		axiom: Axiom.String
		value: string
	}

	export interface Number extends Base {
		axiom: Axiom.Number
		value: number
	}

	export type Atom = Symbol | Number | String

	export interface List extends Base {
		axiom: Axiom.List
		children: (Atom | List)[]
	}

	export type Expression = Atom | List
}
