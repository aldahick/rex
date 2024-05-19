import React, { PropsWithChildren, createContext, useContext } from "react";
import { AuthStore } from "../store/auth.store";
import { SettingsStore } from "../store/settings.store";
import { SidebarStore } from "../store/sidebar.store";

const rootStore = {
  authStore: new AuthStore(),
  settingsStore: new SettingsStore(),
  sidebarStore: new SidebarStore(),
};
const StoreContext = createContext(rootStore);
export const useStores = (): typeof rootStore => useContext(StoreContext);

export const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => (
  <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
);
