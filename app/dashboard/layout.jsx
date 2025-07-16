import Sidebar from "./_components/Sidebar";

export default function ChatroomLayout({ children }) {
	return (
		<div className="flex h-full bg-[#1B1C1D] text-white">
			<Sidebar />
			<main className="flex-1 overflow-auto p-4">{children}</main>
		</div>
	);
}
