
import {Data} from "./types/data.js"
import {atomize} from "./atomize.js"
import {Axiom} from "./types/axiom.js"
import {Token} from "../tokenize/types/token.js"
import {Syntax} from "../tokenize/types/syntax.js"
import {AssemblyError} from "./errors/assembly-error.js"

export function assemble(inputTokens: Token.Any[]): Data.Expression[] {

	function recurse(tokens: Token.Any[]): Data.Expression {
		if (!tokens.length) throw new Error("unexpected end of file")
		const token = tokens.shift()
		switch (token.syntax) {

			case Syntax.Close: {
				throw new AssemblyError(token.trace, `unexpected closer ")"`)
			}

			case Syntax.Open: {
				const children: Data.Expression[] = []
				while (tokens[0].syntax !== Syntax.Close)
					children.push(recurse(tokens))
				const closingToken = tokens.shift()
				return <Data.List>{
					axiom: Axiom.List,
					children,
					trace: {
						...token.trace,
						end: closingToken.trace.end,
					},
				}
			}

			default: {
				return atomize(token)
			}
		}
	}

	const tokens = [...inputTokens]
	const expressions: Data.Expression[] = []
	while (tokens.length) {
		expressions.push(recurse(tokens))
	}

	return expressions
}
