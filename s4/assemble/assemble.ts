
import {Data} from "./types/data.js"
import {atomize} from "./atomize.js"
import {Axiom} from "./types/axiom.js"
import {Token} from "../tokenize/types/token.js"
import {Syntax} from "../tokenize/types/syntax.js"
import {AssemblyError} from "./errors/assembly-error.js"

export function assemble(tokens: Token.Any[]): Data.Expression {
	const [token, ...remainingTokens] = tokens
	switch (token.syntax) {

		case Syntax.Open: {
			if (!remainingTokens.length)
				throw new AssemblyError(token.trace, `expected ")"`)
			const children: Data.Expression[] = []
			while (remainingTokens[0].syntax !== Syntax.Close)
				children.push(assemble(remainingTokens))
			return <Data.List>{
				axiom: Axiom.List,
				children,
				trace: {
					...token.trace,
					end: remainingTokens.shift().trace.end,
				},
			}
		}

		case Syntax.Close:
			throw new AssemblyError(token.trace, `unexpected ")"`)

		default:
			return atomize(token)
	}
}
