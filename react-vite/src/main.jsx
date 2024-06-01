import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";
import { Modal, ModalProvider } from "./context/Modal";
import MenuProvider from "./context/MenuContext";
import UserProvider from "./context/SessionUser";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ModalProvider >
        <UserProvider>
          <MenuProvider>
            <RouterProvider router={router} />
            <Modal />
          </MenuProvider>
        </UserProvider>
      </ModalProvider>
    </ReduxProvider>
  </React.StrictMode>
);
