
import {Suite, expect} from "cynic"

import {parse} from "./parse.js"
import {Axiom, SymbolData, ListData} from "./types.js"

export default <Suite> {
	"parser": {
		"parse empty string returns nil": async() => {
			const program = ``
			const tree = <SymbolData>parse(program)
			return expect(tree.type).equals(Axiom.Symbol)
				&& expect(tree.body).equals("nil")
		},
		"parse simple math operation": async() => {
			const program = `(+ 1 2)`
			const tree = <ListData>parse(program)
			return expect(tree.children).ok()
				&& expect(tree.children[0].type).equals(Axiom.Symbol)
				&& expect(tree.children[1].type).equals(Axiom.Number)
				&& expect(tree.children[2].type).equals(Axiom.Number)
		},
		"parse nested maths": async() => {
			const program = `(+ 1 (/ 3 4))`
			const tree = <ListData>parse(program)
			console.log(tree)
			return expect(tree.children).ok()
				&& expect(tree.children[0].type).equals(Axiom.Symbol)
				&& expect(tree.children[1].type).equals(Axiom.Number)
				&& expect(tree.children[2].type).equals(Axiom.List)
				&& expect((<ListData>tree.children[2]).children[0].type).equals(Axiom.Symbol)
				&& expect((<ListData>tree.children[2]).children[1].type).equals(Axiom.Number)
				&& expect((<ListData>tree.children[2]).children[2].type).equals(Axiom.Number)
		},
	},
}
