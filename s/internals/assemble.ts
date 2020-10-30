
import {atomize} from "./atomize.js"
import {Axiom, ExpressionData, ListData} from "../types.js"

export function assemble(tokens: string[]): ExpressionData {
	const token = tokens.shift()
	switch (token) {

		case "(": {
			const children = []
			while (tokens[0] !== ")") children.push(assemble(tokens))
			tokens.shift()
			return <ListData>{
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
