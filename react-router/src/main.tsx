import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import Router from "@components/Router/Router";
import Routes from "@components/Routes/Routes";
import Route from "@components/Route/Route";
import Root from "@pages/Root/Root";
import About from "@pages/About/About";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <Router>
    <Routes>
      <Route path="/" component={<Root />}></Route>
      <Route path="/about" component={<About />}></Route>
    </Routes>
  </Router>
);
