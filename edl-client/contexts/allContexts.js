import React from "react";

import { UserProvider } from "./userContext";
import { AuthProvider } from "./authContext";
import { ListenProvider } from "./listenContext";
import { PermissionsProvider } from "./permissionsContext";

const AllContextsProvider = (props) => {
  return (
    <UserProvider>
      <AuthProvider>
        <ListenProvider>
          <PermissionsProvider>{props.children}</PermissionsProvider>
        </ListenProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default AllContextsProvider;
