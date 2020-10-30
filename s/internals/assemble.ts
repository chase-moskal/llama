
import {atomize} from "./atomize.js"
import {Datatype, ExpressionData, ListData} from "../types.js"

export function assemble([token, ...more]: string[]): ExpressionData {
	switch (token) {

		case "(": {
			const children = []
			for (let i = 0; i < more.length; i++) {
				const sub = more[i]
				if (sub !== ")") children.push(assemble([sub]))
				else break
			}
			return <ListData>{
				type: Datatype.List,
				children,
			}
		}

		case ")":
			throw new Error("unexpected )")

		default:
			return atomize(token)
	}
}
