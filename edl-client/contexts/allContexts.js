import React from "react";

import { UserProvider } from "./userContext";
import { AuthProvider } from "./authContext";
import { ListenProvider } from "./listenContext";

const AllContextsProvider = (props) => {
  return (
    <UserProvider>
      <AuthProvider>
        <ListenProvider>{props.children}</ListenProvider>
      </AuthProvider>
    </UserProvider>
  );
};

export default AllContextsProvider;
