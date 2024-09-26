import React from "react"
import { Link } from "react-router-dom"

import useThemeStore from "../../../hooks/themeStore"

const Header = (props: { subTitle?: string }) => {
	const { theme, setTheme } = useThemeStore()

	const onChangeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target !== null) {
			setTheme(e.target.checked ? "dark" : "light")
		}
	}

	return (
		<>
			<div className="z-50 w-full fixed flex justify-center pt-3 px-3 md:px-5 bg-gradient-to-b from-base-100 bg-opacity-80">
				<div
					className={`max-w-5xl navbar min-h-0 h-12 md:min-h-16 rounded-md bg-base-100 bg-opacity-80 shadow-lg ${theme == "dark" ? "shadow-neutral" : ""} "`}
				>
					<div className="flex-1 items-baseline text-lg font-semibold pl-3">
						<Link to={`/`} className="text-nowrap">
							<div className={`${props.subTitle ? "hidden md:block" : ""} md:text-xl`}>English Word Test Maker</div>
							<div className={`${props.subTitle ? "md:hidden" : "hidden"} text-xs font-normal`}>Home |</div>
						</Link>
						{props.subTitle && <span className="md:text-xs md:font-normal ml-2">{props.subTitle}</span>}
					</div>
					<div className="flex-none">
						<ul className="menu menu-horizontal">
							<li>
								<label className="swap swap-rotate px-2 md:px-3">
									<input type="checkbox" className="theme-controller" value="lofi or black" onChange={onChangeTheme} checked={theme == "dark"} />

									{/* sun icon */}
									<svg className="swap-off w-5 h-5 md:w-6 md:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
									</svg>

									{/* moon icon */}
									<svg className="swap-on w-5 h-5 md:w-6 md:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
										<path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
									</svg>
								</label>
							</li>
							<li>
								<Link to={`https://github.com/lala-p/englishwordtestmaker`} target="_blank" className="px-2 md:px-3">
									<svg className="w-5 h-5 md:w-6 md:h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96">
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
										/>
									</svg>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className=""></div>
		</>
	)
}

export default Header
