
import Token from "../types/token.js"
import Syntax from "../types/syntax.js"

import atomTracker from "./atom-tracker.js"
import stringTracker from "./string-tracker.js"

export default function prepareTrackers(tokens: Token.Any[]) {
	const pusher = (type: Syntax) =>
		({value, trace}) => tokens.push({type, trace, value})
	return {
		string: stringTracker(pusher(Syntax.String)),
		atom: atomTracker(pusher(Syntax.String)),
	}
}
