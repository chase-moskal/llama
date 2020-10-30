
import {Suite, expect} from "cynic"

import {parse} from "./parse.js"
import {Datatype, SymbolData, ListData} from "./types.js"

export default <Suite> {
	"parser": {
		"parse empty string returns nil": async() => {
			const program = ``
			const tree = <SymbolData>parse(program)
			return expect(tree.type).equals(Datatype.Symbol)
				&& expect(tree.body).equals("nil")
		},
		"parse simple math operation": async() => {
			const program = `(+ 1 2)`
			const tree = <ListData>parse(program)
			return expect(tree.children).ok()
				&& expect(tree.children[0].type).equals(Datatype.Symbol)
				&& expect(tree.children[1].type).equals(Datatype.Number)
				&& expect(tree.children[2].type).equals(Datatype.Number)
		},
	},
}
