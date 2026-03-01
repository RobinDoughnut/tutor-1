import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AppContextProvider from "./context/AppContext.jsx";
import AdminContextProvider from "./context/AdminContext.jsx";
import TutorContextProvider from "./context/TutorContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
        <TutorContextProvider>
          <App />
        </TutorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
