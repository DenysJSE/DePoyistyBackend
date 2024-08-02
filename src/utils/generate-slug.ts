const translit = (str: string): string => {
	const en =
		"A-a-B-b-V-v-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SHC-shc-'-'-Y-y-'-'-E-e-YU-yu-YA-ya".split(
			'-'
		)
	let res = ''
	for (let i = 0, l = str.length; i < l; i++) {
		let s = str.charAt(i),
			n = en.indexOf(s)
		if (n >= 0) {
			res += en[n]
		} else {
			res += s
		}
	}
	return res
}

export const generateSlug = (str: string): string => {
	let url: string = str.replace(/[\s]+/gi, '-')
	url = translit(url)
	url = url
		.replace(/[^0-9a-z_\-]+/gi, '')
		.replace('---', '-')
		.replace('--', '-')
		.toLowerCase()

	return url
}
