import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "./components/ui/common/ThemeProvider";
import { AppliedJobsProvider } from "@/context/AppliedJobsContext"; 
import { JobsProvider } from "./context/JobsContext";
import { AuthProvider } from "./context/AuthContext";
import { UsersProvider } from "./context/UsersContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppliedJobsProvider>
            <JobsProvider>
              <UsersProvider>
                <App />
              </UsersProvider>
            </JobsProvider>
          </AppliedJobsProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
