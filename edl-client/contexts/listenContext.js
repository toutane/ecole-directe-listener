import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "./userContext";

const url = "http://192.168.86.183:3000/api";
// const url = "https://edl-core.toutane.now.sh/api";

const ListenContext = React.createContext();
const { Provider } = ListenContext;

const ListenProvider = (props) => {
  const { token, eleveId, expoPushToken } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const [cronId, setCronId] = useState("");

  const [interval, setInterval] = useState(1);

  async function startListening() {
    setIsLoading(true);
    let response = await fetch(
      `${url}/start?interval=${interval}&token=${token}&eleveId=${eleveId}&expoPushToken=${expoPushToken}`,
      {
        method: "GET",
      }
    );

    let result = await response.json();
    result.status === "success"
      ? (setIsListening(true), setCronId(result.cron_job_id))
      : setIsListening(false);
    setIsLoading(false);
  }

  async function stopListening() {
    setIsLoading(true);
    let response = await fetch(`${url}/stop?id=${cronId}`, {
      method: "GET",
    });

    let result = await response.json();
    result.status === "success" && (setIsListening(false), setCronId(""));
    setIsLoading(false);
  }

  return (
    <Provider
      value={{ cronId, isLoading, isListening, startListening, stopListening }}
    >
      {props.children}
    </Provider>
  );
};

export { ListenContext, ListenProvider };
