
import {Suite} from "cynic"
import {parse} from "./parse.js"

export default <Suite>{
	async "parse"() {
		const program = `(a b)(c (d))`
		const tree = parse(program)
		console.log(JSON.stringify(tree, undefined, " "))
	},
}
