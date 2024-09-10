# norm.js
Mobile-API for [norm](https://play.google.com/store/apps/details?id=com.tokarevco.norm) reputation-based recommendation social network, [Web-Site](https://norm.gg/)

## Example
```JavaScript
async function main() {
	const { Norm } = require("./norm.js")
	const norm = new Norm()
	await norm.signIn("email", "password")
}

main()
```
