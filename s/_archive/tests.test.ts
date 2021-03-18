
import {Suite, expect} from "cynic"

import {parse} from "./parse.js"
import {evaluate} from "./evaluate.js"
import {Axiom, Syntax} from "./types.js"

export default <Suite> {
	"parse": {
		"parse empty string returns nil": async() => {
			const program = ``
			const tree = <Syntax.Symbol>parse(program)
			return expect(tree.type).equals(Axiom.Symbol)
				&& expect(tree.body).equals("nil")
		},
		"parse simple math operation": async() => {
			const program = `(+ 1 2)`
			const tree = <Syntax.List>parse(program)
			return expect(tree.children).ok()
				&& expect(tree.children[0].type).equals(Axiom.Symbol)
				&& expect(tree.children[1].type).equals(Axiom.Number)
				&& expect(tree.children[2].type).equals(Axiom.Number)
		},
		"parse nested expressions": async() => {
			const program = `(+ 1 (/ 3 4))`
			const tree = <Syntax.List>parse(program)
			return expect(tree.children).ok()
				&& expect(tree.children[0].type).equals(Axiom.Symbol)
				&& expect(tree.children[1].type).equals(Axiom.Number)
				&& expect(tree.children[2].type).equals(Axiom.List)
				&& expect((<any>tree.children[2]).children[0].type).equals(Axiom.Symbol)
				&& expect((<any>tree.children[2]).children[1].type).equals(Axiom.Number)
				&& expect((<any>tree.children[2]).children[2].type).equals(Axiom.Number)
		},
	},
	"evaluate": {
		"empty program returns nil": async() => {
			const program = ``
			const expression = <Syntax.Symbol>parse(program)
			const result = <Syntax.Symbol>evaluate({expression, environment: {nil: "nil"}})
			return expect(result.type).equals(Axiom.Symbol)
				&& expect(result.body).equals("nil")
		},
		"number evaluates to number": async() => {
			const program = `556`
			const expression = <Syntax.Number>parse(program)
			const result = <Syntax.Number>evaluate({expression, environment: {nil: "nil"}})
			return expect(result.type).equals(Axiom.Number)
				&& expect(result.value).equals(556)
		},
		"if statement then and else": async() => {
			const result1 = <Syntax.Symbol>evaluate({
				expression: parse(`(if true a b)`),
				environment: {nil: "nil"},
			})
			const result2 = <Syntax.Symbol>evaluate({
				expression: parse(`(if nil a b)`),
				environment: {nil: "nil"},
			})
			return expect(result1.body).equals("a")
				&& expect(result2.body).equals("b")
		},
	},
}
