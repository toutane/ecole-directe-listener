import React, { useState, useContext } from "react";
import { UserContext } from "./userContext";

const AuthContext = React.createContext();
const { Provider } = AuthContext;

const url = "https://api.ecoledirecte.com";

const AuthProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const { username, password, setToken, setEleveId } = useContext(UserContext);

  async function login() {
    let data = `data={ "identifiant": "${username}", "motdepasse": "${password}" }`;

    await setLoading(true);

    let response = await fetch(`${url}/v3/login.awp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/edn",
      },
      body: data,
    });

    let result = await response.json();

    result.code === 200
      ? (console.log(
          `Successfully authenticated, eleveId: ${
            result.data.accounts[0].id
          }, token: ${result.token.slice(0, 10)}... `
        ),
        setAuthenticated(true),
        setLoading(false),
        setToken(result.token),
        setEleveId(result.data.accounts[0].id))
      : console.log(`Failed to authenticate, error code: ${result.code}`);
  }

  async function logout() {
    await setAuthenticated("");
    setToken("");
    setEleveId("");
  }

  return (
    <Provider value={{ authenticated, loading, login, logout }}>
      {props.children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
