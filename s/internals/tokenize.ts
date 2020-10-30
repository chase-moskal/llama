
export function tokenize(input: string) {
	return input
		.trim()
		.replace(/\(/gi, " ( ")
		.replace(/\)/gi, " ) ")
		.split(" ")
		.filter(token => !!token.length)
}
