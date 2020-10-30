
import {Axiom, Syntax} from "../types.js"

const nil: Syntax.Symbol = Object.freeze({
	type: Axiom.Symbol,
	body: "nil",
})

export function atomize(token: string): Syntax.Atom {
	if (typeof token !== "string") return nil
	token = token.trim()
	if (!token.length) return nil
	try {
		const value = <number>new Number(token)
		if (isNaN(value)) throw new Error()
		return <Syntax.Number>{
			type: Axiom.Number,
			value,
		}
	}
	catch (error) {}
	return <Syntax.Symbol>{
		type: Axiom.Symbol,
		body: token,
	}
}
