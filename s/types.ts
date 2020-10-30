
export enum Datatype {
	Symbol,
	Number,
	List,
	Environment,
}

export type ListChildren = [SymbolData, ...Datum[]]

export interface Datum {
	type: Datatype
}

export interface SymbolData extends Datum {
	type: Datatype.Symbol
	body: string
}

export interface NumberData extends Datum {
	type: Datatype.Number
	value: number
}

export interface ListData extends Datum {
	type: Datatype.List
	children: ListChildren
}

export interface EnvironmentData extends Datum {
	type: Datatype.Environment
	store: {[key: string]: Datum}
}

export type AtomData = SymbolData | NumberData
export type ExpressionData = AtomData | ListData
