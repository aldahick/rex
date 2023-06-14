import "reflect-metadata";
import "typeface-open-sans";
import "@emotion/react";

import * as React from "react";
import { createContext, useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { config } from "./config";
import * as features from "./features";
import { SecureRoute } from "./features/auth";
import { Layout } from "./features/layout";
import { AuthStore, SettingsStore, SidebarStore } from "./store";

const rootStore = {
  authStore: new AuthStore(),
  settingsStore: new SettingsStore(),
  sidebarStore: new SidebarStore(),
};
const StoreContext = createContext(rootStore);
export const useStores = (): typeof rootStore => useContext(StoreContext);

export const App: React.FC = () => {
  const pages = Object.values(features).flatMap((f) => f.pages ?? []);

  return (
    <BrowserRouter basename={config.basePath}>
      <StoreContext.Provider value={rootStore}>
        <Layout>
          <Routes>
            {pages.map((page) => {
              const props = {
                key: page.route,
                exact: true,
                path: page.route,
                component: page.component,
              };
              return page.permissions ? (
                <SecureRoute {...props} permissions={page.permissions} />
              ) : (
                <Route {...props} />
              );
            })}
          </Routes>
        </Layout>
      </StoreContext.Provider>
    </BrowserRouter>
  );
};
