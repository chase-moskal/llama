
export enum Axiom {
	Symbol,
	Number,
	List,
	Environment,
}

export type ListChildren = [SymbolData, ...Datum[]]

export interface Datum {
	type: Axiom
}

export interface SymbolData extends Datum {
	type: Axiom.Symbol
	body: string
}

export interface NumberData extends Datum {
	type: Axiom.Number
	value: number
}

export interface ListData extends Datum {
	type: Axiom.List
	children: ListChildren
}

export interface EnvironmentData extends Datum {
	type: Axiom.Environment
	store: {[key: string]: Datum}
}

export type AtomData = SymbolData | NumberData
export type ExpressionData = AtomData | ListData
