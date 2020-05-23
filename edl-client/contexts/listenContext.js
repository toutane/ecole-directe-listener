import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "./userContext";

const url = "http://192.168.86.183:3000/api";
// const url = "https://edl-core.toutane.now.sh/api";

const ListenContext = React.createContext();
const { Provider } = ListenContext;

const ListenProvider = (props) => {
  const { token, eleveId } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  async function startListening() {
    let order = "start";
    let interval = 1 * 2000;

    setIsLoading(true);
    let response = await fetch(
      `${url}/start?order=${order}&interval=${interval}&token=${token}&eleveId=${eleveId}`,
      {
        method: "GET",
      }
    );
    let result = await response.json();
    setIsListening(true);
    setIsLoading(false);
    console.log(result.status);
  }

  async function stopListening() {
    let order = "stop";
    let interval = 1 * 2000;

    setIsLoading(true);
    let response = await fetch(
      `${url}/stop?order=${order}&interval=${interval}&token=${token}&eleveId=${eleveId}`,
      {
        method: "GET",
      }
    );
    let result = await response.json();
    setIsListening(false);
    setIsLoading(false);
    console.log(result.status);
  }

  // async function listening(order) {
  //   let interval = 1 * 1000;

  //   setIsListening(true);
  //   let response = await fetch(
  //     `${url}/listen?order=${order}&interval=${interval}&token=${token}&eleveId=${eleveId}`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   let result = await response.json();
  //   setIsListening(false);
  //   console.log(result.value);
  // }

  return (
    <Provider value={{ isLoading, isListening, startListening, stopListening }}>
      {props.children}
    </Provider>
  );
};

export { ListenContext, ListenProvider };
