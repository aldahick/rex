import "reflect-metadata";
import "typeface-open-sans";
import "@emotion/react";

import React from "react";
import { createContext, useContext } from "react";

import { Layout } from "./features/layout/Layout";
import { AuthStore } from "./store/auth.store";
import { SettingsStore } from "./store/settings.store";
import { SidebarStore } from "./store/sidebar.store";

const rootStore = {
  authStore: new AuthStore(),
  settingsStore: new SettingsStore(),
  sidebarStore: new SidebarStore(),
};
const StoreContext = createContext(rootStore);
export const useStores = (): typeof rootStore => useContext(StoreContext);

export const App: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>
      <Layout>{children}</Layout>
    </StoreContext.Provider>
  );
};
