
import {Suite, expect} from "cynic"
import {parse, Datatype, SymbolData, ListData} from "./sketch.js"

export default <Suite> {
	"parser": {
		"parse empty string returns nil": async() => {
			const tree = <SymbolData>parse(``)
			return expect(tree.type).equals(Datatype.Symbol)
				&& expect(tree.body).equals("nil")
		},
		"parse simple math operation": async() => {
			const tree = <ListData>parse(`(+ 1 2)`)
			return expect(tree.children).ok()
				&& expect(tree.children[0].type).equals(Datatype.Symbol)
				&& expect(tree.children[1].type).equals(Datatype.Number)
				&& expect(tree.children[2].type).equals(Datatype.Number)
		},
	},
}
