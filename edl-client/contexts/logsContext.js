import React, { useState } from "react";

const LogsContext = React.createContext();
const { Provider } = LogsContext;

const LogsProvider = (props) => {
  const [logs, setLogs] = useState([]);

  async function newLog(type, payload, item) {
    // console.log(item);
    setLogs((prvState) =>
      prvState.concat(
        type === "start"
          ? [
              {
                index: logs.length === 0 ? 1 : logs[logs.length - 1].index + 1,
                created: new Date(),
                status: payload.status,
                code: payload.status === "success" ? 200 : payload.code,
                type: "api/start",
                message: "Start listening",
                text:
                  payload.status === "success"
                    ? `↪ Cron Id: ${payload.cron_job_id} `
                    : payload.message,
              },
            ]
          : type === "stop"
          ? [
              {
                index: logs.length === 0 ? 1 : logs[logs.length - 1].index + 1,
                created: new Date(),
                status: payload.status,
                code: payload.status === "success" ? 200 : payload.code,
                type: "api/stop",
                message: "Stop listening",
                text:
                  payload.status === "success"
                    ? `↪ Cron Id: ${item.cronId}\n↪ Short Id: ${item.shortId}\n↪ ${item.num} fetch(s)\n↪ Updated: ${item.updated} time(s)`
                    : payload.message,
              },
              { code: 111, index: 0 },
            ]
          : [{}]
      )
    );
  }

  return (
    <Provider value={{ logs, setLogs, newLog }}>{props.children}</Provider>
  );
};

export { LogsContext, LogsProvider };
