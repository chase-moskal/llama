
export function parse(input: string) {
	const tokens = tokenize(input)
	return assembleSyntaxTree(tokens)
}

function tokenize(input: string) {
	return input
		.trim()
		.replace("(", " ( ")
		.replace(")", " ) ")
		.split(" ")
		.filter(token => !!token.length)
}

function assembleSyntaxTree([token, ...more]: string[]): ExpressionData {
	switch (token) {

		case "(": {
			const children = []
			for (let i = 0; i < more.length; i++) {
				const sub = more[i]
				if (sub !== ")") children.push(assembleSyntaxTree([sub]))
				else break
			}
			return <ListData>{
				type: Datatype.List,
				children,
			}
		}

		case ")":
			throw new Error("unexpected )")

		default:
			return atomize(token)
	}
}

export enum Datatype {
	Symbol,
	Number,
	List,
	Environment,
}

const nil: SymbolData = Object.freeze({
	type: Datatype.Symbol,
	body: "nil",
})

function atomize(token: string): AtomData {
	if (typeof token !== "string") return nil
	token = token.trim()
	if (!token.length) return nil
	try {
		const value = <number>new Number(token)
		if (isNaN(value)) throw new Error()
		return <NumberData>{
			type: Datatype.Number,
			value,
		}
	}
	catch (error) {}
	return <SymbolData>{
		type: Datatype.Symbol,
		body: token,
	}
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
