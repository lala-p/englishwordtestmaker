import { useEffect } from "react"
import { Outlet } from "react-router-dom"

import useThemeStore from "../../hooks/useThemeStore"

const Root = () => {
	const { initThemeStore } = useThemeStore()

	useEffect(() => {
		initThemeStore()
	}, [])

	return (
		<>
			<Outlet />
		</>
	)
}

export default Root
