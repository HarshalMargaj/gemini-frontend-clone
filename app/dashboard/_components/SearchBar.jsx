import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({ setSearchQuery }) => {
	return (
		<div className="dark:border-neutral-700 border-neutral-300 border flex items-center gap-2 p-2 rounded-md">
			<Search />
			<input
				type="text"
				placeholder="search..."
				onChange={e => setSearchQuery(e.target.value)}
				className="outline-none border-none"
			/>
		</div>
	);
};

export default SearchBar;
