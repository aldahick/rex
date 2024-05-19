import { observer } from "mobx-react-lite";
import React from "react";
import { useLocation, useNavigate } from "react-router";
import { IAuthPermission } from "../../graphql";
import { useStores } from "../../hooks";

export interface AuthGuardProps extends React.PropsWithChildren {
  permissions: IAuthPermission[];
}

export const AuthGuard: React.FC<AuthGuardProps> = observer(
  ({ children, permissions }) => {
    const { authStore } = useStores();
    const location = useLocation();
    const navigate = useNavigate();

    if (!permissions.every((p) => authStore.isAuthorized(p))) {
      const params = new URLSearchParams({ redirect: location.pathname });
      navigate(`/login?${params.toString()}`);
      return null;
    }

    return children;
  },
);
