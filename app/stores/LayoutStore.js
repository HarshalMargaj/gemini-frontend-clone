import { create } from "zustand";

export const useLayoutStore = create(set => ({
	isSidebarOpen: false,
	toggleSidebar: () =>
		set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
	setSidebarOpen: value => set({ isSidebarOpen: value }),
}));
