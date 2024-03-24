import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { NotificationProvider } from "./components/notification-base/NotificationTemplate";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </I18nextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();