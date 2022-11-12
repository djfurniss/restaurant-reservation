import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 */

export default function Layout() {
  return (
    <div id="Layout">
        <div id="menu">
          <Menu />
        </div>
        <div id="content">
          <Routes />
        </div>
    </div>
  );
};
