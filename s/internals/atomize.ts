
import {Datatype, SymbolData, AtomData, NumberData} from "../types.js"

const nil: SymbolData = Object.freeze({
	type: Datatype.Symbol,
	body: "nil",
})

export function atomize(token: string): AtomData {
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
