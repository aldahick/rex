import { ApolloProvider } from "@apollo/client";
import React from "react";
import { Outlet } from "react-router-dom";
import { useSdkClient } from "../../hooks/useSdkClient.hook";
import { StatusProvider } from "../../hooks/useStatus.hook";

export const Layout: React.FC = () => {
  const apolloClient = useSdkClient();

  return (
    <ApolloProvider client={apolloClient}>
      <StatusProvider />
      <Outlet />
    </ApolloProvider>
  );
};
