
import {Axiom, Syntax} from "./types.js"

export function evaluate({expression, environment}: {
		expression: Syntax.Expression
		environment: {[key: string]: any}
	}): Syntax.Atom {

	switch (expression.type) {
		case Axiom.Symbol: {
			const item = lookup(environment, expression.body)
			if (item) return item
			if (detect.truthy(expression)) return expression
			return expression
		}
		case Axiom.Number: return make.number(expression.value)
		case Axiom.List: {
			const [first, ...more] = expression.children
			switch (first.body) {
				case "if": {
					const [conditionBlock, thenBlock, elseBlock] = more
					const conditionEvaluation = evaluate({
						expression: <Syntax.Expression>conditionBlock,
						environment,
					})
					if (detect.truthy(conditionEvaluation))
						return evaluate({expression: <Syntax.Expression>thenBlock, environment})
					else
						return evaluate({expression: <Syntax.Expression>elseBlock, environment})
				}
				default:
					throw new Error(`unknown symbol "${first.body}"`)
			}
		}
		default:
			throw new Error(`unknown expression type`)
	}
}

const detect = {
	truthy: (expression: Syntax.Expression): boolean => (
		expression
			&& expression.type === Axiom.Symbol
			&& expression.body === "true"
	) || false
}

const make = {
	nil: (): Syntax.Symbol => ({type: Axiom.Symbol, body: "nil"}),
	symbol: (body: string): Syntax.Symbol => ({type: Axiom.Symbol, body}),
	number: (value: number): Syntax.Number => ({type: Axiom.Number, value}),
}

function lookup(environment: {[key: string]: any}, body: string): Syntax.Atom {
	if (Object.keys(environment).includes(body)) {
		const value = environment[body]
		if (typeof value === "number") return make.number(value)
		else if (typeof value === "string") return make.symbol(value)
		else return make.nil()
	}
}
