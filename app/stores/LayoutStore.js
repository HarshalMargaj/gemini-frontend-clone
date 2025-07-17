import { create } from "zustand";

export const useLayoutStore = create(set => ({
	isSidebarOpen: true,
	toggleSidebar: () =>
		set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
	setSidebarOpen: value => set({ isSidebarOpen: value }),
}));
