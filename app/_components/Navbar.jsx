import { Menu, Moon, Sun } from "lucide-react";
import React from "react";
import { useLayoutStore } from "../stores/LayoutStore";

const Navbar = ({ toggleTheme, theme }) => {
	const toggleSidebar = useLayoutStore(state => state.toggleSidebar);

	return (
		<div className="dark:text-white  h-15 flex p-4 items-center justify-between shadow-b shadow-lg z-10">
			<div onClick={toggleSidebar} className="md:hidden">
				<Menu />
			</div>
			<h1 className="text-2xl md:pl-0 pl-10">Gemini Clone</h1>
			<div onClick={toggleTheme}>
				{theme === "dark" ? <Sun /> : <Moon />}
			</div>
		</div>
	);
};

export default Navbar;
