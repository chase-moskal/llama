
import {Data} from "./types/data.js"
import {Axiom} from "./types/axiom.js"
import {Token} from "../tokenize/types/token.js"
import {Syntax} from "../tokenize/types/syntax.js"

export function atomize(token: Token.Any): Data.Atom {
	switch (token.syntax) {

		case Syntax.Atom: {
			const {value, trace} = token
			try {
				const x = new Number(value).valueOf()
				if (isNaN(x)) throw false
				return <Data.Number>{
					axiom: Axiom.Number,
					value: x,
					trace,
				}
			}
			catch (error) {}
			return <Data.Symbol>{
				axiom: Axiom.Symbol,
				value,
				trace,
			}
		}

		case Syntax.String: {
			const {value, trace} = token
			return <Data.String>{
				axiom: Axiom.String,
				value,
				trace,
			}
		}
	}
}
