import Router from "preact-router";
import { InOut } from "./pages/in-out";

import "./app.css";

export function App() {
  return (
    <>
      <Router>
        <InOut path="/in-out" />
      </Router>
    </>
  );
}
