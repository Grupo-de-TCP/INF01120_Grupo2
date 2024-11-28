import { AppRoot } from "app/app.root";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Suspense fallback="Loading...">
    <BrowserRouter>
      <AppRoot />
    </BrowserRouter>
  </Suspense>,
);
