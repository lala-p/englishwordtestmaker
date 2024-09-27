import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import useThemeStore from "../../hooks/useThemeStore"

const Root = () => {
	const { initTheme } = useThemeStore()

	useEffect(() => {
		initTheme()
	}, [])

	return (
		<>
			<Outlet />
		</>
	)
}

export default Root
