import { Moon, Sun } from "lucide-react";
import React from "react";

const Navbar = ({ toggleTheme, theme }) => {
	return (
		<div className="dark:text-white  h-15 flex p-4 items-center justify-between shadow-b shadow-lg z-10">
			<h1 className="text-2xl">Gemini Clone</h1>
			<div onClick={toggleTheme}>
				{theme === "dark" ? <Sun /> : <Moon />}
			</div>
		</div>
	);
};

export default Navbar;
