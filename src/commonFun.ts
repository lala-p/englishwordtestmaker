export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

export const dateFormat = (date: Date): string => {
	const ymd = `${date.getFullYear()}-${date.getMonth().toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
	const hms = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`

	return `${ymd} ${hms}`
}

export const randomInt = (max: number, min: number = 0): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomIntArr = (length: number, max: number, min: number = 0): number[] => {
	const arr: number[] = []
	let num: number = 0
	for (let i = 0; i < length; i++) {
		do {
			num = randomInt(max, min)
		} while (arr.includes(num))

		arr.push(num)
	}

	return arr
}

export const scrollTop = () => {
	window.scrollTo(0, 0)
}
