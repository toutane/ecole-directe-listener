import React from "react";

import { UserProvider } from "./userContext";
import { AuthProvider } from "./authContext";
import { ListenProvider } from "./listenContext";
import { PermissionsProvider } from "./permissionsContext";
import { LogsProvider } from "./logsContext";

const AllContextsProvider = (props) => {
  return (
    <UserProvider>
      <AuthProvider>
        <LogsProvider>
          <ListenProvider>
            <PermissionsProvider>{props.children}</PermissionsProvider>
          </ListenProvider>
        </LogsProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default AllContextsProvider;
