
import {Axiom, SymbolData, AtomData, NumberData} from "../types.js"

const nil: SymbolData = Object.freeze({
	type: Axiom.Symbol,
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
			type: Axiom.Number,
			value,
		}
	}
	catch (error) {}
	return <SymbolData>{
		type: Axiom.Symbol,
		body: token,
	}
}
