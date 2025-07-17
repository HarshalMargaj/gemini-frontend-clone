import Sidebar from "./_components/Sidebar";

export default function ChatroomLayout({ children }) {
	return (
		<div className="flex h-full dark:bg-[#1B1C1D] text-white">
			<Sidebar />
			<main className="flex-1 p-4">{children}</main>
		</div>
	);
}
