
export enum Axiom {
	Symbol,
	Number,
	List,
	Environment,
}

export namespace Syntax {
	export type Sub = [Symbol, ...Datum[]]
	export interface Datum {
		type: Axiom
	}

	export interface Symbol extends Datum {
		type: Axiom.Symbol
		body: string
	}

	export interface Number extends Datum {
		type: Axiom.Number
		value: number
	}

	export interface List extends Datum {
		type: Axiom.List
		children: Sub
	}

	export interface Environment extends Datum {
		type: Axiom.Environment
		store: {[key: string]: Datum}
	}

	export type Atom = Symbol | Number
	export type Expression = Atom | List
}
