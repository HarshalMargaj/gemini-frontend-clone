"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const ContentLayout = ({ children }) => {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.classList.toggle("dark", newTheme === "dark");
		localStorage.setItem("theme", newTheme);
	};

	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "light";
		setTheme(storedTheme);
		document.documentElement.classList.toggle(
			"dark",
			storedTheme === "dark"
		);
	}, []);

	return (
		<div className="h-full flex flex-col overflow-hidden">
			<Navbar toggleTheme={toggleTheme} theme={theme} />
			<div className="flex-1 overflow-hidden">{children}</div>
		</div>
	);
};

export default ContentLayout;
