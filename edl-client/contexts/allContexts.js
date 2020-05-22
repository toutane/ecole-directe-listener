import React from "react";

import { UserProvider } from "./userContext";
import { AuthProvider } from "./authContext";

const AllContextsProvider = (props) => {
  return (
    <UserProvider>
      <AuthProvider>{props.children}</AuthProvider>
    </UserProvider>
  );
};

export default AllContextsProvider;
