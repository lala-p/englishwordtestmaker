import { create } from "zustand"

type ThemeT = "light" | "dark"

const saveTheme = (theme: ThemeT) => {
	let changedTheme = ""

	switch (theme) {
		case "light":
			changedTheme = "lofi"
			break

		case "dark":
			changedTheme = "dim"
			break
	}

	document.querySelector("html")?.setAttribute("data-theme", changedTheme)
	localStorage.setItem("theme", theme)
}

type StateT = {
	theme: ThemeT
}

type ActionsT = {
	initTheme: () => void
	setTheme: (theme: ThemeT) => void
}

let initialState: StateT = {
	theme: "light",
}

const useThemeStore = create<StateT & ActionsT>((set) => ({
	...initialState,
	initTheme: () => {
		const savedTheme = localStorage.getItem("theme")
		let changedTheme: ThemeT = "light"

		if (savedTheme !== null && (savedTheme == "light" || savedTheme == "dark")) {
			changedTheme = savedTheme
		} else if (!!window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
			changedTheme = "dark"
		}

		saveTheme(changedTheme)
		set(() => ({ theme: changedTheme }))
	},
	setTheme: (theme: ThemeT) => {
		saveTheme(theme)
		set(() => ({ theme: theme }))
	},
}))

export default useThemeStore
