import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
//import ReactDOM from "react-dom";

import Home from "./page/Home";
import Edit from "./page/Edit";
import reportWebVitals from "./reportWebVitals";
import "./style/index.css";
import Menu from "./components/menu";
import ErrorPage from "./page/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: "/edit",
    element: <Edit />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Menu />
    
    <RouterProvider router={router} />
  </React.StrictMode>
);
reportWebVitals();
/*

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/configuration">
        <Configuration />
      </Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
*/
