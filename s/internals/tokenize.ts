
export function tokenize(input: string) {
	return input
		.trim()
		.replace("(", " ( ")
		.replace(")", " ) ")
		.split(" ")
		.filter(token => !!token.length)
}
