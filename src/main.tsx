import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const params = [
  {
    id: 1,
    name: "Назначение",
  },
  {
    id: 2,
    name: "Длина",
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App params={params} model={model} />
  </React.StrictMode>
);
