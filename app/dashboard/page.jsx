import React from "react";

const page = () => {
	return (
		<div className="h-full flex items-center justify-center flex-col gap-4">
			<div className="text-center md:text-4xl text-2xl text-neutral-800 dark:text-white">
				What's on the agenda today?
			</div>
			<p className="text-sm text-gray-400 mb-4">
				Select a chat from the sidebar or start a new one.
			</p>
		</div>
	);
};

export default page;
