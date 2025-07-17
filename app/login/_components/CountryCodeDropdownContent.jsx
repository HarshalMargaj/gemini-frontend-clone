import React from "react";

const CountryCodeDropdownContent = ({ countryCodes, setValue }) => {
	return (
		<div className="p-2 rounded-md space-y-2 h-[300px] overflow-y-auto dark:bg-gray-700 shadow-lg dark:border dark:border-neutral-700 scrollbar-hide bg-white">
			{countryCodes.map((code, index) => {
				return (
					<div
						key={index}
						onClick={() => setValue("countryCode", code.idd.root)}
						className="flex items-center gap-2 dark:text-white cursor-pointer"
					>
						<img
							src={code.flags.svg}
							alt={code.flags.alt}
							width={32}
							height={32}
						/>
						<div>{code.idd.root}</div>
					</div>
				);
			})}
		</div>
	);
};

export default CountryCodeDropdownContent;
