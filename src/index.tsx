import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader, action as rootAction } from "./routes/Root";
import ErrorPage from "./ErrorPage";
import Contact, { loader as contactLoader, action as contactAction } from "./routes/Contact";
import EditContact, { action as editAction } from "./routes/EditContact";
import { action as contactDeleteAction } from "./routes/destroy";
import Index from "./routes/Index";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [{
      errorElement: <ErrorPage />,
      children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader, //same id as contact above so same loader for same data
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: contactDeleteAction,
        errorElement: (
          <div>
            Oops! There was an <em>error.</em>
          </div>
        ),
      },],}
  ],
  },
]);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
