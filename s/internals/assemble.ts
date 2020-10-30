
import {atomize} from "./atomize.js"
import {Axiom, Syntax} from "../types.js"

export function assemble(tokens: string[]): Syntax.Expression {
	const token = tokens.shift()
	switch (token) {

		case "(": {
			const children = []
			while (tokens[0] !== ")") children.push(assemble(tokens))
			tokens.shift()
			return <Syntax.List>{
				type: Axiom.List,
				children,
			}
		}

		case ")":
			throw new Error("unexpected )")

		default:
			return atomize(token)
	}
}
